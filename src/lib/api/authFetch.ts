// Клиентская обёртка над fetch: подставляет JWT и обрабатывает 401.
// Использовать для всех запросов, требующих (или принимающих) авторизацию.
// Вход и регистрацию через неё НЕ делаем: там 401 значит «неверный пароль».
import { useAuthStore } from "@/stores/useAuthStore";

export async function authFetch(
  input: RequestInfo | URL,
  init: RequestInit = {},
): Promise<Response> {
  const { token, handleUnauthorized } = useAuthStore.getState();

  const headers = new Headers(init.headers);
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const res = await fetch(input, { ...init, headers });

  if (res.status === 401 && token) handleUnauthorized(token);
  return res;
}
