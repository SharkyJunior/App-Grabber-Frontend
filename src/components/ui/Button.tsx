import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
  iconOnly?: boolean;
};

export function Button({
  className,
  variant = "primary",
  iconOnly = false,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "rounded-xl font-medium transition inline-flex items-center justify-center hover:cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:opacity-50 disabled:pointer-events-none",
        iconOnly ? "p-2 aspect-square" : "px-4 py-2",
        variant === "primary" &&
          "bg-accent text-accent-foreground hover:bg-accent-hover",
        variant === "secondary" &&
          "bg-surface text-foreground border border-border hover:bg-surface-hover",
        className,
      )}
      {...props}
    />
  );
}