export type StoreKind = "google_play" | "rustore";

export type StoreMeta = {
  kind: StoreKind;
  label: string; // "Google Play"
  app: import("@/lib/api/apps").App;
};
