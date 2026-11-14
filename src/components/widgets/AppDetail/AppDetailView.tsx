"use client";

import { useState } from "react";
import { StoreTabs } from "./StoreTabs";
import { StoreDataTable } from "./StoreDataTable";
import type { App } from "@/lib/api/apps";
import { StoreKind } from "./types";

export type StoreEntry = {
  kind: StoreKind;
  label: string;
  app: App;
};

export function AppDetailView({ stores }: { stores: StoreEntry[] }) {
  const [selected, setSelected] = useState<StoreKind[]>(() =>
    stores.length > 0 ? [stores[0].kind] : [],
  );

  if (stores.length === 0) return null;

  const columns = selected
    .map((kind) => stores.find((s) => s.kind === kind))
    .filter((s): s is StoreEntry => s !== undefined);

  if (columns.length === 0) return null;

  const canAdd = selected.length < stores.length;
  const isSingle = columns.length === 1;

  const addColumn = () => {
    const next = stores.find((s) => !selected.includes(s.kind));
    if (!next) return;
    setSelected((prev) => [...prev, next.kind]);
  };

  const removeColumn = (index: number) => {
    setSelected((prev) =>
      prev.length <= 1 ? prev : prev.filter((_, i) => i !== index),
    );
  };

  const changeColumn = (index: number, kind: StoreKind) => {
    setSelected((prev) => {
      const next = [...prev];
      const otherIndex = next.indexOf(kind);

      // picking a store already in another column = swap
      if (otherIndex !== -1 && otherIndex !== index) {
        next[otherIndex] = next[index];
      }

      next[index] = kind;
      return next;
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* single-column mode: full-size tabs above the card, exactly like before */}
      {isSingle && (
        <StoreTabs
          stores={stores.map(({ kind, label }) => ({ value: kind, label }))}
          active={columns[0].kind}
          onChange={(kind) => changeColumn(0, kind)}
        />
      )}

      <StoreDataTable
        columns={columns}
        allStores={stores.map(({ kind, label }) => ({ kind, label }))}
        canAdd={canAdd}
        onAdd={addColumn}
        onChange={changeColumn}
        onRemove={removeColumn}
      />
    </div>
  );
}
