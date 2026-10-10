"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { cn, isValidPackageName } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { TagSelect } from "@/components/ui/TagSelect";
import { SearchWidgetProps } from "./types";
import { Error } from "@/components/ui/Error";
import { useSearchStore } from "@/stores/useSearchStore";
import { Spinner } from "@/components/ui/Spinner";

export default function SearchWidget({
  placeholder = "com.example.app или название приложения",
  className,
}: SearchWidgetProps) {
  const router = useRouter();
  const {
    query,
    selectedStores,
    toggleStore,
    setQuery,
    appendToHistory,
    clearResults,
    runSearch,
    isSearching,
  } = useSearchStore();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const isPackage = isValidPackageName(query.trim());
  const busy = isPending || isSearching;

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;

    setError(null);
    appendToHistory(q);

    if (isPackage) {
      clearResults();
      const res = await fetch(`/api/apps/${encodeURIComponent(q)}`);
      if (res.status === 404) {
        setError(`Приложение ${q} не найдено`);
        return;
      }
      if (!res.ok) {
        setError("Не удалось загрузить приложение");
        return;
      }
      startTransition(() => router.push(`/apps/${encodeURIComponent(q)}`));
      return;
    }

    runSearch(q);
  }

  function handleQueryChange(value: string) {
    setQuery(value);
    if (error) setError(null);
    //if (results) setResults(null);
  }

  return (
    <section
      className={cn(
        "flex flex-col gap-4 rounded-xl border border-[#DCDFD8] bg-white p-6 shadow-sm",
        className,
      )}
    >
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={query}
          onChange={(e) => handleQueryChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1"
        />
        {busy ? (
          <Spinner className="self-center" />
        ) : (
          <Button type="submit" disabled={isPending}>
            Поиск
          </Button>
        )}
      </form>

      {error !== null && <Error text={error} />}

      <div className="flex flex-row align-middle gap-4">
        <p className="text-sm text-neutral-600 self-center">Искать в:</p>
        <TagSelect
          options={["Google Play", "RuStore"]}
          selected={selectedStores}
          onChange={toggleStore}
        />
      </div>
    </section>
  );
}
