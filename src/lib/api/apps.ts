import { API_BASE, authHeader, readError } from "./client";

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
  packageName: string,
  authorization?: string | null,
): Promise<App | null> {
  const res = await fetch(
    `${API_BASE}/api/apps/${encodeURIComponent(packageName)}`,
    { cache: "no-store", headers: authHeader(authorization) },
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
  authorization?: string | null,
): Promise<AppSearchResult | null> {
  const res = await fetch(
    `${API_BASE}/api/search?q=${encodeURIComponent(query)}`,
    { cache: "no-store", headers: authHeader(authorization) },
  );

  if (res.status === 401) throw await readError(res);
  if (res.status === 502) return null;
  if (!res.ok) {
    throw new Error(`Failed to search! query=${query}: ${res.status}`);
  }
  return res.json() as Promise<AppSearchResult>;
}
