import { API_BASE, readError } from "./client";

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

export async function getApp(
  storeName: string,
  packageName: string,
  headers: HeadersInit = {},
): Promise<App | null> {
  console.log(
    `fetching ${API_BASE}/api/apps/${encodeURIComponent(storeName)}/${encodeURIComponent(packageName)}`,
  );
  const res = await fetch(
    `${API_BASE}/api/apps/${encodeURIComponent(storeName)}/${encodeURIComponent(packageName)}`,
    { cache: "no-store", headers },
  );

  if (res.status === 404) return null;
  if (res.status === 401) throw await readError(res);
  if (!res.ok) {
    throw new Error(`Failed to fetch app ${packageName}: ${res.status}`);
  }
  return res.json() as Promise<App>;
}

export async function search(
  query: string,
  headers: HeadersInit = {},
): Promise<AppSearchResult | null> {
  const res = await fetch(
    `${API_BASE}/api/search?q=${encodeURIComponent(query)}`,
    { cache: "no-store", headers },
  );

  if (res.status === 401) throw await readError(res);
  if (res.status === 502) return null;
  if (!res.ok) {
    throw new Error(`Failed to search! query=${query}: ${res.status}`);
  }
  return res.json() as Promise<AppSearchResult>;
}
