"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/stores/useAuthStore";
import { usePathname } from "next/navigation";

export function UserMenu() {
  const pathname = usePathname();
  const status = useAuthStore((s) => s.status);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  // Пока не проверили токен, держим место, чтобы шапка не прыгала.
  if (status === "idle") {
    return <div className="ml-auto h-9 w-40" aria-hidden />;
  }

  if (status === "authenticated" && user) {
    return (
      <div className="ml-auto flex items-center gap-4">
        <Link
          href="/profile"
          className="text-foreground font-medium hover:text-accent transition-colors"
        >
          {user.nickname}
        </Link>
        <Button variant="secondary" onClick={logout}>
          Выйти
        </Button>
      </div>
    );
  }

  return (
    <div className="ml-auto flex items-center gap-2">
      <Button variant="secondary">
        <Link href={`/login?next=${encodeURIComponent(pathname)}`}>Войти</Link>
      </Button>
      <Button variant="primary">
        <Link href={`/register?next=${encodeURIComponent(pathname)}`}>
          Регистрация
        </Link>
      </Button>
    </div>
  );
}
