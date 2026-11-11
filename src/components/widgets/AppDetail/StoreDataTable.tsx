"use client";

import { Fragment, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { App } from "@/lib/api/apps";
import { StoreTabs } from "./StoreTabs";
import { StoreKind } from "./types";

const MAX_RATING = 5;

export type StoreColumn = {
  kind: StoreKind;
  label: string;
  app: App;
};

type Field = {
  key: string;
  label: string;
  render: (app: App) => ReactNode;
};

const FIELDS: Field[] = [
  { key: "name", label: "Название", render: (app) => app.name },
  { key: "developer", label: "Разработчик", render: (app) => app.developer },
  { key: "category", label: "Категория", render: (app) => app.category },
  { key: "age_rating", label: "Возраст", render: (app) => app.age_rating },
  {
    key: "rating",
    label: "Оценка",
    render: (app) => (
      <span className="inline-flex items-center gap-2">
        <StarIcon className="h-4 w-4 text-rating" />
        {app.rating.toString().replace(".", ",")} из {MAX_RATING}
      </span>
    ),
  },
  {
    key: "package_name",
    label: "Package name",
    render: (app) => <span className="font-mono">{app.package_name}</span>,
  },
  {
    key: "store_url",
    label: "Ссылка",
    render: (app) => (
      <a
        href={app.store_url}
        target="_blank"
        rel="noopener noreferrer"
        className="break-all text-accent hover:underline"
      >
        {app.store_url}
      </a>
    ),
  },
  {
    key: "icon_url",
    label: "Иконка",
    render: (app) => (
      <span className="break-all font-mono text-sm text-muted-text">
        {app.icon_url}
      </span>
    ),
  },
];

export function StoreDataTable({
  columns,
  allStores,
  canAdd,
  onAdd,
  onChange,
  onRemove,
  className,
}: {
  columns: StoreColumn[];
  allStores: { kind: StoreKind; label: string }[];
  canAdd: boolean;
  onAdd: () => void;
  onChange: (index: number, kind: StoreKind) => void;
  onRemove: (index: number) => void;
  className?: string;
}) {
  if (columns.length === 0) return null;

  const isSingle = columns.length === 1;
  const showAdd = allStores.length > 1;
  const tabs = allStores.map((s) => ({ value: s.kind, label: s.label }));

  return (
    <section
      className={cn(
        "group relative rounded-2xl border border-border bg-card p-8",
        className,
      )}
    >
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 pb-4">
        <h2 className="text-2xl font-bold text-foreground">
          {isSingle ? `Данные из ${columns[0].label}` : "Сравнение магазинов"}
        </h2>

        {showAdd && (
          <button
            type="button"
            onClick={onAdd}
            disabled={!canAdd}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
              canAdd
                ? "border-border text-foreground hover:cursor-pointer hover:border-accent hover:text-accent"
                : "cursor-not-allowed border-border-subtle text-muted-text opacity-50",
            )}
          >
            <span className="text-base leading-none">+</span>
            Добавить колонку
          </button>
        )}
      </div>

      <div className="relative">
        <dl
          className="grid gap-x-8"
          style={{
            gridTemplateColumns: `minmax(8rem, max-content) repeat(${columns.length}, minmax(0, 1fr))`,
          }}
        >
          {/* header row (tabs per column) — only in comparison mode */}
          {!isSingle && (
            <>
              <div
                aria-hidden="true"
                className="border-b border-border-subtle pb-2"
              />
              {columns.map((column, index) => (
                <div
                  key={column.kind}
                  className="relative min-w-0 border-b border-border-subtle"
                >
                  <StoreTabs
                    stores={tabs}
                    active={column.kind}
                    onChange={(kind) => onChange(index, kind)}
                    size="compact"
                    className="border-b-0"
                  />
                  <button
                    type="button"
                    onClick={() => onRemove(index)}
                    aria-label={`Убрать колонку ${column.label}`}
                    className="absolute -right-3 -top-1 flex h-6 w-6 items-center justify-center rounded-full text-muted-text transition-colors hover:cursor-pointer hover:bg-surface hover:text-foreground"
                  >
                    ×
                  </button>
                </div>
              ))}
            </>
          )}

          {/* data rows */}
          {FIELDS.map((field) => (
            <Fragment key={field.key}>
              <dt className="border-b border-border-subtle py-4 pr-4 text-base text-muted-text">
                {field.label}
              </dt>
              {columns.map((column) => (
                <dd
                  key={column.kind}
                  className="min-w-0 wrap-break-word border-b border-border-subtle py-4 text-base text-foreground"
                >
                  {field.render(column.app)}
                </dd>
              ))}
            </Fragment>
          ))}
        </dl>

        {/* hover-to-add strip on the right edge */}
        {/*{showAdd && canAdd && (
          <div className="pointer-events-none absolute inset-y-0 -right-6 flex w-10 items-center justify-center">
            <button
              type="button"
              onClick={onAdd}
              aria-label="Добавить колонку"
              className={cn(
                "pointer-events-auto flex h-24 w-8 items-center justify-center rounded-full border border-dashed border-border text-lg text-muted-text",
                "invisible opacity-0 transition-opacity duration-200",
                "group-hover:visible group-hover:opacity-100",
                "hover:border-accent hover:text-accent hover:cursor-pointer",
                "focus-visible:visible focus-visible:opacity-100",
              )}
            >
              +
            </button>
          </div>
        )}*/}
      </div>
    </section>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9 4.8 17.6l1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
    </svg>
  );
}
