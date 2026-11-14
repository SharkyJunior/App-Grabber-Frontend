import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Tooltip({
  content,
  children,
  className,
  side = "top",
}: {
  content: string;
  children: ReactNode;
  className?: string;
  side?: "top" | "bottom" | "left" | "right";
}) {
  return (
    <div className={cn("group relative inline-flex items-center", className)}>
      {children}

      {/* Tooltip Bubble */}
      <div
        role="tooltip"
        className={cn(
          "pointer-events-none absolute z-50 whitespace-nowrap rounded-md bg-foreground px-2.5 py-1.5 text-xs font-medium text-background opacity-0 shadow-md transition-opacity duration-150",
          "group-hover:opacity-100 group-focus-within:opacity-100",

          // Positioning based on the `side` prop
          side === "top" && "bottom-full left-1/2 mb-2 -translate-x-1/2",
          side === "bottom" && "top-full left-1/2 mt-2 -translate-x-1/2",
          side === "left" && "right-full top-1/2 mr-2 -translate-y-1/2",
          side === "right" && "left-full top-1/2 ml-2 -translate-y-1/2",
        )}
      >
        {content}
        {/* Little CSS Triangle Arrow */}
        <div
          className={cn(
            "absolute h-2 w-2 rotate-45 bg-foreground",
            side === "top" && "-bottom-1 left-1/2 -translate-x-1/2",
            side === "bottom" && "-top-1 left-1/2 -translate-x-1/2",
            side === "left" && "-right-1 top-1/2 -translate-y-1/2",
            side === "right" && "-left-1 top-1/2 -translate-y-1/2",
          )}
        />
      </div>
    </div>
  );
}
