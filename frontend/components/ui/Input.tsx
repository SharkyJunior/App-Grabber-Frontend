import { cn } from "@/lib/utils";

export function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full px-3 py-2 rounded-xl border border-[#DCDFD8] bg-white text-black",
        "focus:outline-none focus:ring-2 focus:ring-black/10",
        className,
      )}
      {...props}
    />
  );
}
