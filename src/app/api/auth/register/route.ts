import { NextResponse } from "next/server";
import { register, type RegisterInput } from "@/lib/api/auth";
import { errorResponse, passthrough, upstreamHeaders } from "@/lib/api/route";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Некорректный JSON" }, { status: 400 });
  }

  try {
    const upstream = await register(
      body as RegisterInput,
      upstreamHeaders(req),
    );
    return passthrough(upstream);
  } catch (e) {
    return errorResponse(e);
  }
}
