"use client";

import { cn } from "@/lib/utils";
import { useSearchStore } from "@/stores/useSearchStore";
import { ResultCard } from "./ResultCard";

export function ResultsWidget({ className }: { className?: string }) {
  const { searchResult, isSearching, searchError } = useSearchStore();

  if (isSearching) {
    return (
      <div className={cn("flex items-center justify-center py-16", className)}>
        <Spinner />
      </div>
    );
  }

  if (searchError) {
    return <p className="py-8 text-center text-neutral-500">{searchError}</p>;
  }

  if (!searchResult || searchResult?.results.length === 0)
    return (
      <h3
        className={cn("p-5 px-10 gap-2 text-[20px] text-gray-500", className)}
      >
        Введите запрос и начните поиск. Здесь появятся результаты
      </h3>
    );

  return (
    <ul className={cn("flex flex-col gap-2", className)}>
      {searchResult?.results.map((app) => (
        <ResultCard app={app} key={app.package_name} />
      ))}
    </ul>
  );
}

function Spinner() {
  return (
    <svg
      className="h-8 w-8 animate-spin text-neutral-400"
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
