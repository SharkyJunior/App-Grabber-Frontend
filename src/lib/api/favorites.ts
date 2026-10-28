import { API_BASE } from "./client";

export type Favorite = {
  store_app_id: number;
  store: string;
  app: {
    package_name: string;
    store_url: string;
    name: string;
    developer: string;
    icon_url: string;
    category: string;
    rating: number;
    age_rating: string;
  };
  created_at: string;
};

export type FavoritesPage = {
  favorites: Favorite[];
  limit: number;
  offset: number;
};

export async function fetchFavorites(
  token: string,
  params: { limit?: number; offset?: number } = {},
): Promise<Response> {
  const q = new URLSearchParams();
  if (params.limit != null) q.set("limit", String(params.limit));
  if (params.offset != null) q.set("offset", String(params.offset));
  return fetch(`${API_BASE}/api/favorites?${q}`, {
    headers: {
      accept: "application/json",
      authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
}

export async function fetchAddFavorite(
  token: string,
  store: string,
  packageName: string,
): Promise<Response> {
  return fetch(
    `${API_BASE}/api/favorites/${encodeURIComponent(store)}/${encodeURIComponent(packageName)}`,
    {
      method: "PUT",
      headers: { accept: "application/json", authorization: `Bearer ${token}` },
      cache: "no-store",
    },
  );
}

export async function fetchRemoveFavorite(
  token: string,
  store: string,
  packageName: string,
): Promise<Response> {
  return fetch(
    `${API_BASE}/api/favorites/${encodeURIComponent(store)}/${encodeURIComponent(packageName)}`,
    {
      method: "DELETE",
      headers: { accept: "application/json", authorization: `Bearer ${token}` },
      cache: "no-store",
    },
  );
}
