"use client";

import { useEffect, useState } from "react";
import { authFetch } from "@/lib/api/authFetch";
import type { App } from "@/lib/api/apps";
import { Spinner } from "@/components/ui/Spinner";
import { Error as ErrorView } from "@/components/ui/Error";
import { AppHeader } from "./AppHeader";
import { AppDetailView } from "./AppDetailView";
import { useRouter } from "next/navigation";

type Props = {
  packageName: string;
};

export function AppPageClient({ packageName }: Props) {
  const router = useRouter();
  const [app, setApp] = useState<App | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    authFetch(`/api/apps/${encodeURIComponent(packageName)}`, {
      cache: "no-store",
    })
      .then(async (res) => {
        if (cancelled) return;
        if (res.status === 404) {
          setNotFound(true);
          return;
        }
        if (!res.ok) throw new Error(`apps: ${res.status}`);
        const data = (await res.json()) as App;
        if (!cancelled) setApp(data);
      })
      .catch((e: Error) => {
        if (!cancelled) setError(e.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [packageName]);

  if (loading) {
    return (
      <main className="mx-auto flex w-full max-w-6xl justify-center px-16 py-8">
        <Spinner />
      </main>
    );
  }

  if (notFound) {
    return (
      <main className="mx-auto w-full max-w-6xl px-16 py-8">
        <p className="text-gray-500">Приложение не найдено.</p>
      </main>
    );
  }

  if (error || !app) {
    return (
      <main className="mx-auto w-full max-w-6xl px-16 py-8">
        <ErrorView text={error ?? "Не удалось загрузить приложение"} />
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-16 py-8">
      <div
        onClick={() => router.back()}
        className="mb-4 inline-flex items-center gap-2 text-base text-blue-600 hover:underline"
      >
        <ChevronLeft className="h-4 w-4" />
        Назад
      </div>

      <AppHeader
        name={app.name}
        developer={app.developer}
        package_name={app.package_name}
        letter={app.name.charAt(0).toUpperCase()}
        iconUrl={app.icon_url}
        availableStore="Google Play"
      />

      <div className="mt-8">
        <AppDetailView
          stores={[{ kind: "google-play", label: "Google Play", app }]}
        />
      </div>
    </main>
  );
}

function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
    >
      <path d="M12 4l-6 6 6 6" />
    </svg>
  );
}
