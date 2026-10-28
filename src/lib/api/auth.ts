import { API_BASE, authHeader, readError } from "./client";

export type User = {
  id: string;
  email: string;
  nickname: string;
  created_at: string;
};

export type LoginResponse = {
  access_token: string;
  token_type: "Bearer";
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

async function postJson<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  if (!res.ok) throw await readError(res);
  return res.json() as Promise<T>;
}

export function register(input: RegisterInput): Promise<User> {
  return postJson<User>("/api/auth/register", input);
}

export function login(input: LoginInput): Promise<LoginResponse> {
  return postJson<LoginResponse>("/api/auth/login", input);
}

export async function getMe(authorization: string | null): Promise<User> {
  const res = await fetch(`${API_BASE}/api/auth/me`, {
    headers: authHeader(authorization),
    cache: "no-store",
  });

  if (!res.ok) throw await readError(res);
  return res.json() as Promise<User>;
}
