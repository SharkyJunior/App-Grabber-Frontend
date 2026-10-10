import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import type { AppResult, StoreResult } from "./types";

type ResultCardProps = {
  app: AppResult;
  onCompare?: (app: AppResult) => void;
};

export function ResultCard({ app, onCompare }: ResultCardProps) {
  const router = useRouter();

  return (
    <article className="flex flex-col items-start gap-6 rounded-2xl border border-[#DCDFD8] bg-white p-6">
      <div className="flex flex-row min-w-0 flex-1 gap-5">
        <div
          className={cn(
            "flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl",
            "bg-blue-50 text-4xl font-bold text-blue-600",
          )}
          aria-hidden="true"
        >
          {app.letter}
        </div>

        <div className="flex flex-col">
          <div className="flex flex-col">
            <h3 className="text-2xl font-bold leading-tight text-black">
              {app.name}
            </h3>
            <p className="text-base text-neutral-500">{app.company}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-base text-neutral-800">
              {app.package}
            </span>
            <span className="rounded-full bg-neutral-100 px-3 py-1 text-sm text-neutral-700">
              {app.category}
            </span>
            <span className="flex items-center gap-1 text-base text-neutral-800">
              <StarIcon className="h-5 w-5 text-amber-500" />
              {app.rating.toString().replace(".", ",")}
            </span>
          </div>
        </div>

        <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center ml-4">
          <Button
            onClick={() => router.push(`/apps/${app.package}`)}
            className="self-start bg-blue-600 px-6 py-3 text-base font-bold text-white hover:bg-blue-700"
          >
            Открыть
          </Button>
          <Button
            onClick={() => onCompare?.(app)}
            className="self-start border-2 border-blue-600 bg-white px-6 py-3 text-base font-bold text-blue-600 hover:bg-blue-50"
          >
            Сравнить
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 pt-1">
        {app.stores.map((store) => (
          <StorePill key={store.name} store={store} />
        ))}
      </div>
    </article>
  );
}

/* ─── Store pill ───────────────────────────────────────────── */

function StorePill({ store }: { store: StoreResult }) {
  const { name, status } = store;

  const base =
    "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium";

  if (status === "found") {
    return (
      <span className={cn(base, "border border-emerald-600 text-emerald-700")}>
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-600" />
        {name} · найдено
      </span>
    );
  }

  if (status === "searching") {
    return (
      <span
        className={cn(
          base,
          "border border-dashed border-neutral-400 text-neutral-500",
        )}
      >
        <DiamondIcon className="h-3.5 w-3.5" />
        {name} · ищем...
      </span>
    );
  }

  return (
    <span className={cn(base, "border border-neutral-300 text-neutral-400")}>
      <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
      {name} · не найдено
    </span>
  );
}

/* ─── Icons ────────────────────────────────────────────────── */

function StarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9 4.8 17.6l1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
    </svg>
  );
}

function DiamondIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
    >
      <path d="M10 2l6 8-6 8-6-8 6-8z" />
    </svg>
  );
}
