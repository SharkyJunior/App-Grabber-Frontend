"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { FavoriteButton } from "./FavoriteButton";

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
  onExportJson,
  onCompare,
  compareLabel = "Сравнить",
  className,
}: AppHeaderProps) {
  return (
    <section
      className={cn(
        "flex items-center gap-6 rounded-2xl border border-border bg-card p-6",
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
          className="flex h-28 w-28 shrink-0 items-center justify-center rounded-2xl bg-accent-subtle text-5xl font-bold text-accent"
        >
          {letter}
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div>
          <div className="flex gap-2">
            <h1 className="text-3xl font-bold leading-tight text-foreground">
              {name}
            </h1>
            <FavoriteButton packageName={package_name} />
          </div>
          <p className="text-lg text-muted-text">{developer}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-lg bg-surface-muted px-3 py-1 font-mono text-base text-foreground">
            {package_name}
          </span>
          <CopyButton value={package_name} />
          {availableStore && (
            <span className="inline-flex items-center gap-2 rounded-full border border-success px-3 py-1 text-sm font-medium text-success">
              <span className="h-2 w-2 rounded-full bg-success" />
              {availableStore}
            </span>
          )}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <Button
          onClick={onExportJson}
          className="border-2 border-accent bg-card px-6 py-3 text-base font-bold text-accent hover:bg-accent-subtle"
        >
          Экспорт JSON
        </Button>
        <Button
          onClick={onCompare}
          className="border-2 border-accent bg-card px-6 py-3 text-base font-bold text-accent hover:bg-accent-subtle"
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
      className="rounded p-1 text-muted-text transition hover:bg-surface-hover hover:text-foreground"
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
