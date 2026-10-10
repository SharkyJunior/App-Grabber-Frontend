"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export type TabItem = {
  href: string;
  label: string;
};

export type TabsProps = {
  items: TabItem[];
  className?: string;
};

export function Tabs({ items, className }: TabsProps) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Основная навигация"
      className={cn("flex items-center gap-10", className)}
    >
      {items.map((item) => {
        const isActive =
          item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "relative py-4 text-md font-semibold transition-colors",
              "after:absolute after:left-0 after:right-0 after:bottom-0 after:h-0.75 after:rounded-full after:transition-colors",
              isActive
                ? "text-black after:bg-blue-600"
                : "text-neutral-400 hover:text-neutral-700 after:bg-transparent",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
