// Клиентская обёртка над fetch: отправляет cookie сессии и обрабатывает 401.
// Использовать для всех запросов, требующих (или принимающих) авторизацию.
// Вход и регистрацию через неё НЕ делаем: там 401 значит «неверный пароль».
import { useAuthStore } from "@/stores/useAuthStore";

export const authEvents = new EventTarget();

export async function authFetch(
  input: RequestInfo | URL,
  init: RequestInit = {},
): Promise<Response> {
  const { token } = useAuthStore.getState();

  const headers = new Headers(init.headers);
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const res = await fetch(input, {
    credentials: "include",
    ...init,
    headers,
  });

  if (res.status === 401) {
    const { status, handleUnauthorized } = useAuthStore.getState();
    if (status === "authenticated") handleUnauthorized();
    authEvents.dispatchEvent(new CustomEvent("unauthorized"));
  }
  return res;
}
