"use client";

import { cn } from "@/lib/utils";
import { StoreKind } from "./types";

type StoreTabsProps = {
  stores: { value: StoreKind; label: string }[];
  active: string;
  onChange: (value: StoreKind) => void;
  className?: string;
};

export function StoreTabs({
  stores,
  active,
  onChange,
  className,
}: StoreTabsProps) {
  return (
    <div
      role="tablist"
      className={cn(
        "flex items-center gap-10 border-b border-border px-2",
        className,
      )}
    >
      {stores.map((store) => {
        const isActive = store.value === active;
        return (
          <button
            key={store.value}
            role="tab"
            type="button"
            aria-selected={isActive}
            onClick={() => onChange(store.value)}
            className={cn(
              "relative py-4 text-lg font-semibold transition-colors",
              "after:absolute after:left-0 after:right-0 after:-bottom-px after:h-0.75 after:rounded-full after:transition-colors",
              isActive
                ? "text-foreground after:bg-accent"
                : "text-muted-text hover:text-foreground after:bg-transparent",
            )}
          >
            {store.label}
          </button>
        );
      })}
    </div>
  );
}
