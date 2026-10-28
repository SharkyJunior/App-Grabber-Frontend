import { NextResponse } from "next/server";
import { getApp } from "@/lib/api/apps";
import { ApiError } from "@/lib/api/client";
import { errorResponse } from "@/lib/api/route";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ packageName: string }> },
) {
  const { packageName } = await params;

  try {
    const app = await getApp(
      decodeURIComponent(packageName),
      req.headers.get("authorization"),
    );

    if (!app) {
      return NextResponse.json({ error: "not found" }, { status: 404 });
    }

    return NextResponse.json(app);
  } catch (e) {
    // 401 от бэкенда (неверный/просроченный токен) отдаём клиенту как есть.
    if (e instanceof ApiError) return errorResponse(e);
    throw e;
  }
}
