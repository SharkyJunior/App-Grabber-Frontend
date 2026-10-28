"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/useAuthStore";
import { usePathname } from "next/navigation";

const linkBase = "px-4 py-2 rounded-xl font-medium transition";

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
      <div className="ml-auto flex items-center gap-4 self-center">
        <Link href={`/profile`} className="text-black font-medium">
          {user.nickname}
        </Link>
        <Button variant="secondary" onClick={logout}>
          Выйти
        </Button>
      </div>
    );
  }

  return (
    <div className="ml-auto flex items-center gap-2 self-center">
      <Link
        href={`/login?next=${encodeURIComponent(pathname)}`}
        className={cn(
          linkBase,
          "bg-white text-black border border-[#DCDFD8] hover:bg-neutral-50",
        )}
      >
        Войти
      </Link>
      <Link
        href={`/register?next=${encodeURIComponent(pathname)}`}
        className={cn(linkBase, "bg-[#1F4FD8] text-white hover:bg-neutral-800")}
      >
        Регистрация
      </Link>
    </div>
  );
}
