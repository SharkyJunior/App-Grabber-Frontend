import { NextResponse } from "next/server";
import { getApp } from "@/lib/api/apps";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ packageName: string }> },
) {
  const { packageName } = await params;
  const app = await getApp(decodeURIComponent(packageName));

  if (!app) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  return NextResponse.json(app);
}
