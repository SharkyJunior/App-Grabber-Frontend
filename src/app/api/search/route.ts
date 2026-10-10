import { NextResponse } from "next/server";
import { search } from "@/lib/api/apps";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.trim() ?? "";

  if (!q) return NextResponse.json({ query: "", results: [] });

  const data = await search(q);
  if (!data) {
    return NextResponse.json(
      { error: "upstream unavailable" },
      { status: 502 },
    );
  }
  return NextResponse.json(data);
}
