import { cn } from "@/lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  variant?: "" | "error";
};

export function Input({ className, variant = "", ...props }: InputProps) {
  return (
    <input
      className={cn(
        "w-full px-3 py-2 rounded-xl border border-[#DCDFD8] bg-white text-black",
        "focus:outline-none focus:ring-2 focus:ring-black/10",
        variant === "error" && "border-error",
        className,
      )}
      {...props}
    />
  );
}
