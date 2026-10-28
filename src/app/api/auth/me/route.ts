import { NextResponse } from "next/server";
import { getMe } from "@/lib/api/auth";
import { errorResponse } from "@/lib/api/route";

export async function GET(req: Request) {
  try {
    const user = await getMe(req.headers.get("authorization"));
    return NextResponse.json(user);
  } catch (e) {
    return errorResponse(e);
  }
}
