import { NextRequest, NextResponse } from "next/server";
import { fetchAddFavorite, fetchRemoveFavorite } from "@/lib/api/favorites";

type Ctx = { params: Promise<{ store: string; packageName: string }> };

export async function PUT(req: NextRequest, ctx: Ctx) {
  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { store, packageName } = await ctx.params;
  const upstream = await fetchAddFavorite(
    auth.slice("Bearer ".length),
    store,
    packageName,
  );
  return passthrough(upstream);
}

export async function DELETE(req: NextRequest, ctx: Ctx) {
  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { store, packageName } = await ctx.params;
  const upstream = await fetchRemoveFavorite(
    auth.slice("Bearer ".length),
    store,
    packageName,
  );
  return passthrough(upstream);
}

async function passthrough(upstream: Response) {
  if (upstream.status === 204) return new NextResponse(null, { status: 204 });
  const body = await upstream.arrayBuffer();
  return new NextResponse(body, {
    status: upstream.status,
    headers: {
      "content-type":
        upstream.headers.get("content-type") ?? "application/json",
      "cache-control": "no-store",
    },
  });
}
