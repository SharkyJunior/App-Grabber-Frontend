import { NextResponse } from "next/server";
import { register, type RegisterInput } from "@/lib/api/auth";
import { errorResponse } from "@/lib/api/route";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Некорректный JSON" }, { status: 400 });
  }

  try {
    const user = await register(body as RegisterInput);
    return NextResponse.json(user, { status: 201 });
  } catch (e) {
    return errorResponse(e);
  }
}
