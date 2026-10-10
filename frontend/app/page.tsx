"use client";

import { HowItWorks } from "@/components/widgets/HowItWorks";
import { AppResult, ResultsWidget } from "@/components/widgets/ResultsWidget";
import SearchWidget from "@/components/widgets/SearchWidget/SearchWidget";

const mock: AppResult[] = [
  {
    id: "uchi",
    name: "Учи.ру",
    company: 'ООО "Учи.ру"',
    package: "com.uchi.app",
    category: "Образование",
    rating: 4.2,
    letter: "У",
    stores: [
      { name: "Google Play", status: "found" },
      { name: "RuStore", status: "searching" },
    ],
  },
];

export default function Home() {
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
      <SearchWidget className="w-full my-4" />

      <div className="grid grid-cols-12 self-center align-middle gap-10">
        <ResultsWidget
          className="col-span-8"
          results={mock}
          onOpen={() => {}}
          onCompare={() => {}}
        ></ResultsWidget>
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
