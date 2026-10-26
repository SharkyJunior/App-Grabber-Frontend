"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Error as ErrorMessage } from "@/components/ui/Error";
import { Input } from "@/components/ui/Input";
import { useAuthStore } from "@/stores/useAuthStore";

type AuthFormProps = {
  mode: "login" | "register";
};

const MIN_PASSWORD = 15;
const MAX_PASSWORD = 32;
const MAX_NICKNAME = 50;
const MAX_EMAIL = 254;

// Принимаем только внутренние пути, иначе ?next= — открытый редирект.
function safeNextPath(next: string | null): string {
  if (!next || !next.startsWith("/") || next.startsWith("//")) return "/";
  if (next.startsWith("/login") || next.startsWith("/register")) return "/";
  return next;
}

export function AuthForm({ mode }: AuthFormProps) {
  const isRegister = mode === "register";
  const router = useRouter();
  const rawNext = useSearchParams().get("next");
  const next = safeNextPath(rawNext);

  const status = useAuthStore((s) => s.status);
  const login = useAuthStore((s) => s.login);
  const register = useAuthStore((s) => s.register);

  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Успешный вход (или уже выполненный ранее) ведёт обратно на страницу.
  useEffect(() => {
    if (status === "authenticated") router.replace(next);
  }, [status, next, router]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (isRegister) {
      if (!nickname.trim()) {
        setError("Введите ник");
        return;
      }
      if (password.length < MIN_PASSWORD) {
        setError(`Пароль должен быть не короче ${MIN_PASSWORD} символов`);
        return;
      }
    }

    setIsSubmitting(true);
    try {
      if (isRegister) {
        await register({ email, nickname, password });
      } else {
        await login(email, password);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Что-то пошло не так");
    } finally {
      setIsSubmitting(false);
    }
  }

  const switchHref = `${isRegister ? "/login" : "/register"}${
    rawNext ? `?next=${encodeURIComponent(rawNext)}` : ""
  }`;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full bg-white border border-[#DCDFD8] rounded-2xl p-6"
    >
      <h1 className="text-black text-2xl font-semibold">
        {isRegister ? "Регистрация" : "Вход"}
      </h1>

      <label className="flex flex-col gap-1 text-sm font-medium text-black">
        Email
        <Input
          type="email"
          name="email"
          autoComplete="email"
          maxLength={MAX_EMAIL}
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      {isRegister && (
        <label className="flex flex-col gap-1 text-sm font-medium text-black">
          Ник
          <Input
            type="text"
            name="nickname"
            autoComplete="nickname"
            maxLength={MAX_NICKNAME}
            required
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </label>
      )}

      <label className="flex flex-col gap-1 text-sm font-medium text-black">
        Пароль
        <Input
          type="password"
          name="password"
          autoComplete={isRegister ? "new-password" : "current-password"}
          maxLength={MAX_PASSWORD}
          minLength={isRegister ? MIN_PASSWORD : undefined}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isRegister && (
          <span className="text-xs font-normal text-gray-500">
            От {MIN_PASSWORD} до {MAX_PASSWORD} символов
          </span>
        )}
      </label>

      {error && <ErrorMessage text={error} />}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="disabled:opacity-60"
      >
        {isSubmitting
          ? "Подождите…"
          : isRegister
            ? "Зарегистрироваться"
            : "Войти"}
      </Button>

      <p className="text-sm text-gray-500">
        {isRegister ? "Уже есть аккаунт? " : "Нет аккаунта? "}
        <Link href={switchHref} className="text-[#1F4FD8] font-medium">
          {isRegister ? "Войти" : "Зарегистрироваться"}
        </Link>
      </p>
    </form>
  );
}
