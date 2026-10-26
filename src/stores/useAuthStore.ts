// stores/useAuthStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { LoginResponse, RegisterInput, User } from "@/lib/api/auth";

// idle — состояние ещё не проверено (до restore), чтобы не мигала шапка.
export type AuthStatus = "idle" | "anonymous" | "authenticated";

interface AuthState {
  // persisted (sessionStorage)
  token: string | null;

  // ephemeral
  user: User | null;
  status: AuthStatus;
  sessionExpired: boolean;

  // actions
  register: (input: RegisterInput) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  restore: () => Promise<void>;
  handleUnauthorized: (expiredToken: string) => void;
  dismissSessionExpired: () => void;
}

const normalizeEmail = (email: string) => email.trim().toLowerCase();

async function postJson<T>(url: string, body: unknown): Promise<T> {
  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error("Ошибка сети");
  }

  const data = (await res.json().catch(() => null)) as
    | (T & { error?: string })
    | null;

  if (!res.ok) {
    throw new Error(data?.error ?? "Не удалось выполнить запрос");
  }
  return data as T;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      status: "idle",
      sessionExpired: false,

      register: async ({ email, nickname, password }) => {
        await postJson<User>("/api/auth/register", {
          email: normalizeEmail(email),
          nickname: nickname.trim(),
          password,
        });
        await get().login(email, password);
      },

      login: async (email, password) => {
        const data = await postJson<LoginResponse>("/api/auth/login", {
          email: normalizeEmail(email),
          password,
        });
        set({
          token: data.access_token,
          user: data.user,
          status: "authenticated",
          sessionExpired: false,
        });
      },

      logout: () =>
        set({
          token: null,
          user: null,
          status: "anonymous",
          sessionExpired: false,
        }),

      restore: async () => {
        const { token, handleUnauthorized } = get();
        if (!token) {
          set({ user: null, status: "anonymous" });
          return;
        }

        try {
          const res = await fetch("/api/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (res.status === 401) {
            handleUnauthorized(token);
            return;
          }
          if (!res.ok) throw new Error("me failed");

          const user = (await res.json()) as User;
          if (get().token !== token) return;
          set({ user, status: "authenticated" });
        } catch {
          if (get().token === token) set({ user: null, status: "anonymous" });
        }
      },

      handleUnauthorized: (expiredToken) => {
        if (get().token !== expiredToken) return;
        set({
          token: null,
          user: null,
          status: "anonymous",
          sessionExpired: true,
        });
      },

      dismissSessionExpired: () => set({ sessionExpired: false }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (s) => ({ token: s.token }),
    },
  ),
);
