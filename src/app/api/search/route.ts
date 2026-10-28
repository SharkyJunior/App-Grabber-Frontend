import { NextResponse } from "next/server";
import { search } from "@/lib/api/apps";
import { ApiError } from "@/lib/api/client";
import { errorResponse } from "@/lib/api/route";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.trim() ?? "";

  if (!q) return NextResponse.json({ query: "", results: [] });

  try {
    const data = await search(q, req.headers.get("authorization"));
    if (!data) {
      return NextResponse.json(
        { error: "upstream unavailable" },
        { status: 502 },
      );
    }
    return NextResponse.json(data);
  } catch (e) {
    if (e instanceof ApiError) return errorResponse(e);
    throw e;
  }
}
