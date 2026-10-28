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
      className={cn("flex items-center gap-6 lg:gap-10", className)}
    >
      {items.map((item) => {
        const isActive =
          item.href === "/"
            ? pathname === "/" || pathname.startsWith("/apps/")
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "relative py-4 text-base font-semibold transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm",
              "after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[3px] after:rounded-full after:transition-colors",
              isActive
                ? "text-foreground after:bg-accent"
                : "text-muted-text hover:text-foreground after:bg-transparent",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}