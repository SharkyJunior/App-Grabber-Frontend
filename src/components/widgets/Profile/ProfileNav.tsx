"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const PROFILE_SECTIONS = [
  { href: "/profile", label: "Обзор" },
  { href: "/profile/favorites", label: "Избранное" },
  { href: "/profile/history", label: "История" },
];

export type ProfileNavProps = {
  className?: string;
};

export function ProfileNav({ className }: ProfileNavProps) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Разделы профиля"
      className={cn("w-full md:w-52 md:shrink-0", className)}
    >
      <ul className="flex gap-1 overflow-x-auto rounded-xl bg-surface p-1 md:flex-col md:gap-1 md:rounded-none md:bg-transparent md:p-0">
        {PROFILE_SECTIONS.map((item) => {
          const isActive =
            item.href === "/profile"
              ? pathname === "/profile"
              : pathname === item.href ||
                pathname.startsWith(`${item.href}/`);

          return (
            <li key={item.href} className="flex-1 md:flex-none">
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "block whitespace-nowrap rounded-lg px-4 py-2 text-center text-sm font-medium transition-colors md:text-left",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  isActive
                    ? "bg-card text-foreground shadow-sm md:bg-accent-subtle md:text-accent md:shadow-none"
                    : "text-muted-text hover:bg-surface-hover hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
