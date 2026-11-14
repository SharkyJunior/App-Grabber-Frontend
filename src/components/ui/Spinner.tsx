import { cn } from "@/lib/utils";

export type SpinnerProps = {
  className?: string;
};

export function Spinner({ className }: SpinnerProps) {
  return (
    <svg
      className={cn("h-6 w-6 animate-spin text-muted-text", className)}
      viewBox="0 0 24 24"
      fill="none"
      aria-label="Загрузка"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
        className="opacity-25"
      />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
