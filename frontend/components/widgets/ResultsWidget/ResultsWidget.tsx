import { cn } from "@/lib/utils";
import { ResultCard } from "./ResultCard";
import type { ResultsWidgetProps } from "./types";

export function ResultsWidget({
  results,
  className,
  onOpen,
  onCompare,
}: ResultsWidgetProps) {
  return (
    <section
      aria-labelledby="results-heading"
      className={cn("flex flex-col gap-4", className)}
    >
      <header className="flex items-baseline justify-between">
        <h2
          id="results-heading"
          className="text-3xl font-bold tracking-tight text-black"
        >
          Результаты
        </h2>
        <p className="text-base text-neutral-500 self-center h-fit">
          Найдено: {results.length}{" "}
          {pluralize(results.length, "приложение", "приложения", "приложений")}
        </p>
      </header>

      <div className="flex flex-col gap-3">
        {results.map((app) => (
          <ResultCard
            key={app.id}
            app={app}
            onOpen={onOpen}
            onCompare={onCompare}
          />
        ))}
      </div>
    </section>
  );
}

function pluralize(n: number, one: string, few: string, many: string) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return few;
  return many;
}
