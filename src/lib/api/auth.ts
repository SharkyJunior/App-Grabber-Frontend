import { API_BASE } from "./client";

export type User = {
  id: string;
  email: string;
  nickname: string;
  created_at: string;
};

export type LoginResponse = {
  // Бэкенд авторизует по HttpOnly-cookie; поле оставлено для совместимости.
  access_token?: string;
  user: User;
};

export type RegisterInput = {
  email: string;
  nickname: string;
  password: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

async function postJson(
  path: string,
  body: unknown,
  headers: HeadersInit = {},
): Promise<Response> {
  const requestHeaders = new Headers(headers);
  requestHeaders.set("Content-Type", "application/json");

  return fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify(body),
    cache: "no-store",
  });
}

export function register(
  input: RegisterInput,
  headers: HeadersInit = {},
): Promise<Response> {
  return postJson("/api/auth/register", input, headers);
}

export function login(
  input: LoginInput,
  headers: HeadersInit = {},
): Promise<Response> {
  return postJson("/api/auth/login", input, headers);
}

export function logout(headers: HeadersInit = {}): Promise<Response> {
  return fetch(`${API_BASE}/api/auth/logout`, {
    method: "POST",
    headers,
    cache: "no-store",
  });
}

export function getMe(headers: HeadersInit = {}): Promise<Response> {
  return fetch(`${API_BASE}/api/auth/me`, {
    headers,
    cache: "no-store",
  });
}
