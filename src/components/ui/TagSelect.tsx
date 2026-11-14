// components/ui/TagSelect.tsx
"use client";

import { cn } from "@/lib/utils";
import { StoreName } from "@/stores/useSearchStore";

export type TagSelectProps = {
  options: StoreName[];
  selected: string[];
  onChange: (selected: StoreName) => void;
  className?: string;
};

export function TagSelect({
  options,
  selected,
  onChange,
  className,
}: TagSelectProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {options.map((option) => {
        const isSelected = selected.includes(option);
        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            aria-pressed={isSelected}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-medium transition",
              "border focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/30",
              isSelected
                ? "bg-accent-subtle text-accent border-accent"
                : "bg-card text-foreground border-border hover:border-border-strong",
            )}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
