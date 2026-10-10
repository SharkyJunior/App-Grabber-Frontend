export type StoreKind = "google-play" | "rustore";

export type StoreMeta = {
  kind: StoreKind;
  label: string;              // "Google Play"
  app: import("@/lib/api/apps").App;
};
