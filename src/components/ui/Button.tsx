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
        iconOnly
          ? "p-2 aspect-square inline-flex items-center justify-center"
          : "px-4 py-2",
        variant === "primary" && "bg-[#1F4FD8] text-white hover:bg-neutral-800",
        variant === "secondary" &&
          "bg-white text-black border border-[#DCDFD8] hover:bg-neutral-50",
        className,
      )}
      {...props}
    />
  );
}
