import { NextRequest } from "next/server";
import { fetchFavorites } from "@/lib/api/favorites";
import { passthrough, upstreamHeaders } from "@/lib/api/route";

export async function GET(req: NextRequest) {
  const limit = req.nextUrl.searchParams.get("limit");
  const offset = req.nextUrl.searchParams.get("offset");

  const upstream = await fetchFavorites(upstreamHeaders(req), {
    limit: limit ? Number(limit) : undefined,
    offset: offset ? Number(offset) : undefined,
  });

  return passthrough(upstream);
}
