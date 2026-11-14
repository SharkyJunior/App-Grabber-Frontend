// Общие вещи для серверных обращений к бэкенду.
export const API_BASE = process.env.API_BASE_URL ?? "http://localhost:8080";

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

// Значение заголовка Authorization пробрасывается как есть ("Bearer <token>").
export function authHeader(authorization?: string | null): HeadersInit {
  return authorization ? { Authorization: authorization } : {};
}

// Бэкенд отвечает ошибками вида { "error": "..." }.
export async function readError(res: Response): Promise<ApiError> {
  let message = `Ошибка ${res.status}`;
  try {
    const body = (await res.json()) as { error?: string };
    if (body.error) message = body.error;
  } catch {
    // тело ответа не JSON — оставляем сообщение по умолчанию
  }
  return new ApiError(res.status, message);
}
