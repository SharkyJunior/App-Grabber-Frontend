import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export function Button({
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-xl font-medium transition",
        variant === "primary" && "bg-[#1F4FD8] text-white hover:bg-neutral-800",
        variant === "secondary" &&
          "bg-white text-black border border-[#DCDFD8] hover:bg-neutral-50",
        className,
      )}
      {...props}
    />
  );
}
