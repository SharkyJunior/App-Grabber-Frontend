import { NextResponse } from "next/server";
import { login, type LoginInput } from "@/lib/api/auth";
import { errorResponse, passthrough, upstreamHeaders } from "@/lib/api/route";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Некорректный JSON" }, { status: 400 });
  }

  try {
    const upstream = await login(body as LoginInput, upstreamHeaders(req));
    return passthrough(upstream);
  } catch (e) {
    return errorResponse(e);
  }
}
