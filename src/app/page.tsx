"use client";

import { PromptSelect } from "@/components/ui/PromptSelect";
import { HowItWorks } from "@/components/widgets/HowItWorks";
import { ResultsWidget } from "@/components/widgets/ResultsWidget";
import SearchWidget from "@/components/widgets/SearchWidget/SearchWidget";
import { isValidPackageName } from "@/lib/utils";
import { useSearchStore } from "@/stores/useSearchStore";
import { useRouter } from "next/navigation";

export default function Home() {
  const { queryHistory, runSearch, setQuery, clearHistory } = useSearchStore();
  const router = useRouter();

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col items-start justify-start gap-4 px-4 py-12 sm:px-8 sm:py-16 lg:px-16">
      <h1 className="text-foreground w-full max-w-2xl text-3xl font-semibold text-balance sm:text-4xl">
        Найдите приложение сразу в нескольких магазинах
      </h1>
      <h2 className="text-muted-text w-full max-w-2xl text-base font-medium text-pretty sm:text-lg">
        Вставьте package name, ссылку на карточку или название. Мы соберём данные
        и сопоставим их между магазинами.
      </h2>

      <SearchWidget className="mt-4 mb-2 w-full" />

      {queryHistory.length > 0 && (
        <PromptSelect
          prompts={queryHistory}
          onSelect={(p) => {
            setQuery(p);
            if (isValidPackageName(p)) {
              router.push(`/apps/${p}`);
            } else {
              runSearch(p);
            }
          }}
          onClearHistory={clearHistory}
        />
      )}

      <div className="grid w-full grid-cols-1 items-start gap-10 lg:grid-cols-12">
        <ResultsWidget className="lg:col-span-8" />
        <HowItWorks
          className="lg:col-span-4"
          steps={[
            {
              title: "Введите запрос.",
              text: "Package name, ссылку на магазин или название.",
            },
            {
              title: "Сопоставим данные.",
              text: "Одни и те же поля из каждого магазина, различия подсвечены.",
            },
            {
              title: "Сохраните результат.",
              text: "Экспорт в JSON или CSV для отчёта.",
            },
          ]}
        />
      </div>
    </main>
  );
}