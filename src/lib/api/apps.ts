// lib/api/apps.ts
export type App = {
  package_name: string;
  store_url: string;
  name: string;
  developer: string;
  icon_url: string;
  category: string;
  rating: number;
  age_rating: string;
};

export type AppSearchResult = {
  query: string;
  results: App[];
};

const API_BASE = process.env.API_BASE_URL ?? "http://localhost:8080";

export async function getApp(packageName: string): Promise<App | null> {
  const res = await fetch(
    `${API_BASE}/api/apps/${encodeURIComponent(packageName)}`,
    { cache: "no-store" },
  );

  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`Failed to fetch app ${packageName}: ${res.status}`);
  }
  return res.json() as Promise<App>;
}

export async function search(query: string): Promise<AppSearchResult | null> {
  const res = await fetch(
    `${API_BASE}/api/search?q=${encodeURIComponent(query)}`,
    { cache: "no-store" },
  );

  if (res.status === 502) return null;
  if (!res.ok) {
    throw new Error(`Failed to search! query=${query}: ${res.status}`);
  }
  return res.json() as Promise<AppSearchResult>;
}