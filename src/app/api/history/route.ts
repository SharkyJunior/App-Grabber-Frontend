import { NextRequest } from "next/server";
import { fetchHistory } from "@/lib/api/history";
import { passthrough, upstreamHeaders } from "@/lib/api/route";

export async function GET(req: NextRequest) {
  const limit = req.nextUrl.searchParams.get("limit");
  const offset = req.nextUrl.searchParams.get("offset");

  const upstream = await fetchHistory(upstreamHeaders(req), {
    limit: limit ? Number(limit) : undefined,
    offset: offset ? Number(offset) : undefined,
  });

  return passthrough(upstream);
}
