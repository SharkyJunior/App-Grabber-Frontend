"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

type AppHeaderProps = {
  name: string;
  developer: string;
  package_name: string;
  letter: string;
  iconUrl?: string | null;
  availableStore?: string;
  onSave?: () => void;
  onExportJson?: () => void;
  onCompare?: () => void;
  compareLabel?: string;
  className?: string;
};

export function AppHeader({
  name,
  developer,
  package_name,
  letter,
  iconUrl = null,
  availableStore,
  onSave,
  onExportJson,
  onCompare,
  compareLabel = "Сравнить",
  className,
}: AppHeaderProps) {
  return (
    <section
      className={cn(
        "flex items-center gap-6 rounded-2xl border border-[#DCDFD8] bg-white p-6",
        className,
      )}
    >
      {iconUrl ? (
        <Image
          className="rounded-2xl shadow-lg"
          src={iconUrl}
          height="112"
          width="112"
          alt="app icon"
        ></Image>
      ) : (
        <div
          aria-hidden="true"
          className="flex h-28 w-28 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-5xl font-bold text-blue-600"
        >
          {letter}
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div>
          <h1 className="text-3xl font-bold leading-tight text-black">
            {name}
          </h1>
          <p className="text-lg text-neutral-500">{developer}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-lg bg-neutral-100 px-3 py-1 font-mono text-base text-neutral-800">
            {package_name}
          </span>
          <CopyButton value={package_name} />
          {availableStore && (
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-600 px-3 py-1 text-sm font-medium text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-600" />
              {availableStore}
            </span>
          )}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <Button
          onClick={onSave}
          className="bg-blue-600 px-6 py-3 text-base font-bold text-white hover:bg-blue-700"
        >
          Сохранить
        </Button>
        <Button
          onClick={onExportJson}
          className="border-2 border-blue-600 bg-white px-6 py-3 text-base font-bold text-blue-600 hover:bg-blue-50"
        >
          Экспорт JSON
        </Button>
        <Button
          onClick={onCompare}
          className="border-2 border-blue-600 bg-white px-6 py-3 text-base font-bold text-blue-600 hover:bg-blue-50"
        >
          {compareLabel}
        </Button>
      </div>
    </section>
  );
}

function CopyButton({ value }: { value: string }) {
  "use client";
  return (
    <button
      type="button"
      aria-label="Скопировать"
      onClick={() => navigator.clipboard.writeText(value)}
      className="rounded p-1 text-neutral-500 transition hover:bg-neutral-100 hover:text-black"
    >
      <svg
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="h-5 w-5"
      >
        <rect x="6" y="6" width="10" height="10" rx="1.5" />
        <path d="M4 14V5a1 1 0 011-1h9" />
      </svg>
    </button>
  );
}
