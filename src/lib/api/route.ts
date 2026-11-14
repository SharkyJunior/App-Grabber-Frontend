import { NextResponse } from "next/server";
import { ApiError } from "./client";

// Заголовки браузерного запроса, которые нужно передать бэкенду:
// cookie — сессия, origin/referer — проверка источника для небезопасных методов.
const FORWARDED_HEADERS = ["cookie", "origin", "referer"] as const;

export function upstreamHeaders(
  req: Request,
  headers: HeadersInit = {},
): Headers {
  const result = new Headers(headers);
  for (const name of FORWARDED_HEADERS) {
    const value = req.headers.get(name);
    if (value) result.set(name, value);
  }
  return result;
}

// Отдаёт ответ бэкенда клиенту, сохраняя Set-Cookie (в т.ч. несколько).
export async function passthrough(upstream: Response): Promise<NextResponse> {
  const body =
    upstream.status === 204 || upstream.status === 304
      ? null
      : await upstream.arrayBuffer();

  const headers = new Headers();
  const contentType = upstream.headers.get("content-type");
  if (contentType) headers.set("content-type", contentType);
  headers.set(
    "cache-control",
    upstream.headers.get("cache-control") ?? "no-store",
  );
  for (const cookie of upstream.headers.getSetCookie()) {
    headers.append("set-cookie", cookie);
  }

  return new NextResponse(body, { status: upstream.status, headers });
}

// Превращает ошибку серверного запроса в JSON-ответ route handler.
export function errorResponse(e: unknown) {
  if (e instanceof ApiError) {
    return NextResponse.json({ error: e.message }, { status: e.status });
  }
  return NextResponse.json({ error: "Сервис недоступен" }, { status: 502 });
}
