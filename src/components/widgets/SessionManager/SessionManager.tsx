"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/stores/useAuthStore";

// Проверяет сохранённый токен при загрузке и показывает диалог при 401.
export function SessionManager() {
  const router = useRouter();
  const pathname = usePathname();

  const restore = useAuthStore((s) => s.restore);
  const sessionExpired = useAuthStore((s) => s.sessionExpired);
  const dismiss = useAuthStore((s) => s.dismissSessionExpired);

  useEffect(() => {
    void restore();
  }, [restore]);

  useEffect(() => {
    if (!sessionExpired) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [sessionExpired, dismiss]);

  if (!sessionExpired) return null;

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/30 px-4">
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="session-expired-title"
        aria-describedby="session-expired-text"
        className="flex flex-col gap-4 w-full max-w-sm bg-white border border-[#DCDFD8] rounded-2xl p-6"
      >
        <h2
          id="session-expired-title"
          className="text-black text-xl font-semibold"
        >
          Сессия истекла
        </h2>
        <p id="session-expired-text" className="text-gray-500">
          Войдите снова, чтобы продолжить.
        </p>
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={dismiss}>
            Закрыть
          </Button>
          <Button
            autoFocus
            onClick={() => {
              dismiss();
              router.push(`/login?next=${encodeURIComponent(pathname)}`);
            }}
          >
            Войти снова
          </Button>
        </div>
      </div>
    </div>
  );
}
