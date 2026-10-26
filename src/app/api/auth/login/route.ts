import { NextResponse } from "next/server";
import { login, type LoginInput } from "@/lib/api/auth";
import { errorResponse } from "@/lib/api/route";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Некорректный JSON" }, { status: 400 });
  }

  try {
    const data = await login(body as LoginInput);
    return NextResponse.json(data);
  } catch (e) {
    return errorResponse(e);
  }
}
