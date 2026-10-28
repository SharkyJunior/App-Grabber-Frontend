import { API_BASE } from "./client";
import type { App } from "./apps";

export type View = {
  id: number;
  store_app_id: number;
  store: string;
  app: App;
  viewed_at: string;
};

export type HistoryPage = {
  history: View[];
  limit: number;
  offset: number;
};

export async function fetchHistory(
  token: string,
  params: { limit?: number; offset?: number } = {},
): Promise<Response> {
  const q = new URLSearchParams();
  if (params.limit != null) q.set("limit", String(params.limit));
  if (params.offset != null) q.set("offset", String(params.offset));
  const qs = q.toString();

  return fetch(`${API_BASE}/api/history${qs ? `?${qs}` : ""}`, {
    headers: {
      accept: "application/json",
      authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
}
