import { NextResponse } from "next/server";
import { ApiError } from "./client";

// Превращает ошибку серверного запроса в JSON-ответ route handler.
export function errorResponse(e: unknown) {
  if (e instanceof ApiError) {
    return NextResponse.json({ error: e.message }, { status: e.status });
  }
  return NextResponse.json({ error: "Сервис недоступен" }, { status: 502 });
}
