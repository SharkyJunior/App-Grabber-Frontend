"use client";

import { useState } from "react";
import { StoreTabs } from "./StoreTabs";
import { StoreDataTable } from "./StoreDataTable";
import type { App } from "@/lib/api/apps";
import { StoreKind } from "./types";

export type StoreEntry = {
  kind: StoreKind; // "google-play"
  label: string; // "Google Play"
  app: App; // the API response for that store
};

export function AppDetailView({ stores }: { stores: StoreEntry[] }) {
  const [active, setActive] = useState(stores[0]?.kind ?? "");
  const current = stores.find((s) => s.kind === active) ?? stores[0];
  if (!current) return null;

  return (
    <div className="flex flex-col gap-6">
      <StoreTabs
        stores={stores.map((s) => ({ value: s.kind, label: s.label }))}
        active={active}
        onChange={setActive}
      />
      <StoreDataTable data={current.app} />
    </div>
  );
}
