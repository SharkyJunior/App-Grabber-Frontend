// components/ui/TagSelect.tsx
"use client";

import { cn } from "@/lib/utils";

export type TagSelectProps = {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  className?: string;
};

export function TagSelect({
  options,
  selected,
  onChange,
  className,
}: TagSelectProps) {
  function toggle(option: string) {
    if (selected.includes(option)) {
      onChange(selected.filter((s) => s !== option));
    } else {
      onChange([...selected, option]);
    }
  }

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {options.map((option) => {
        const isSelected = selected.includes(option);
        return (
          <button
            key={option}
            type="button"
            onClick={() => toggle(option)}
            aria-pressed={isSelected}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-medium transition",
              "border focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20",
              isSelected
                ? "bg-[#E6ECFC] text-black border-[#1F4FD8]"
                : "bg-white text-neutral-700 border-[#DCDFD8] hover:border-neutral-400",
            )}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}