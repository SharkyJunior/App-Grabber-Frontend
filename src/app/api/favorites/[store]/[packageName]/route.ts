import { NextRequest } from "next/server";
import { fetchAddFavorite, fetchRemoveFavorite } from "@/lib/api/favorites";
import { passthrough, upstreamHeaders } from "@/lib/api/route";

type Ctx = { params: Promise<{ store: string; packageName: string }> };

export async function PUT(req: NextRequest, ctx: Ctx) {
  const { store, packageName } = await ctx.params;
  const upstream = await fetchAddFavorite(
    upstreamHeaders(req),
    store,
    packageName,
  );
  return passthrough(upstream);
}

export async function DELETE(req: NextRequest, ctx: Ctx) {
  const { store, packageName } = await ctx.params;
  const upstream = await fetchRemoveFavorite(
    upstreamHeaders(req),
    store,
    packageName,
  );
  return passthrough(upstream);
}
