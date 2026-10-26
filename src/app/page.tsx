"use client";

import { PromptSelect } from "@/components/ui/PromptSelect";
import { HowItWorks } from "@/components/widgets/HowItWorks";
import { AppResult, ResultsWidget } from "@/components/widgets/ResultsWidget";
import SearchWidget from "@/components/widgets/SearchWidget/SearchWidget";
import { isValidPackageName } from "@/lib/utils";
import { useSearchStore } from "@/stores/useSearchStore";
import { useRouter } from "next/navigation";

export default function Home() {
  const { queryHistory, runSearch, setQuery } = useSearchStore();
  const router = useRouter();

  return (
    <main className="flex flex-1 self-center w-full max-w-7xl flex-col items-center justify-start gap-4 py-16 px-16 sm:items-start">
      <h1 className="text-black text-4xl font-semibold w-1/2 h-auto">
        Найдите приложение сразу <br />в нескольких магазинах
      </h1>
      <h2 className="text-gray-500 text-lg font-medium w-1/2">
        Вставьте package name, ссылку на карточку или название.
        <br />
        Мы соберём данные и сопоставим их между магазинами.
      </h2>
      <SearchWidget className="w-full mt-4 mb-2" />

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
        />
      )}

      <div className="grid grid-cols-12 self-center items-start gap-10">
        <ResultsWidget className="col-span-8"></ResultsWidget>
        <HowItWorks
          className="col-span-4"
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
