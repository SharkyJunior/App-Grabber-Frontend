import { cn } from "@/lib/utils";

export type PromptSelectProps = {
  title?: string;
  onSelect?: (prompt: string) => void;
  onClearHistory?: () => void;
  prompts?: string[];
  className?: string;
};

export function PromptSelect({
  title = "Недавние запросы",
  onSelect,
  prompts,
  className,
  onClearHistory,
}: PromptSelectProps) {
  return (
    <div className={cn("flex flex-wrap gap-4 mb-4 px-1", className)}>
      <p className="text-muted-text self-center">{title}:</p>
      {prompts?.map((prompt) => {
        return (
          <button
            className="bg-white p-2 px-4 rounded-2xl border-gray-200 border hover:bg-gray-200 cursor-pointer transition-colors duration-200"
            key={prompt}
            type="button"
            onClick={() => onSelect?.(prompt)}
          >
            {prompt}
          </button>
        );
      })}
      <p
        className="text-blue-700 underline cursor-pointer hover:text-blue-500 self-center mx-2"
        onClick={onClearHistory}
      >
        Очистить историю
      </p>
    </div>
  );
}
