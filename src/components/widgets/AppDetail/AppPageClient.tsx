"use client";

import { useEffect, useState } from "react";
import { authFetch } from "@/lib/api/authFetch";
import type { App } from "@/lib/api/apps";
import { Spinner } from "@/components/ui/Spinner";
import { Error as ErrorView } from "@/components/ui/Error";
import { AppHeader } from "./AppHeader";
import { AppDetailView } from "./AppDetailView";
import { useRouter } from "next/navigation";
import { StoreKind } from "./types";

type Props = {
  packageName: string;
};

type AppFromStore = {
  store: StoreKind;
  data: App;
};

type Result = {
  packageName: string;
  apps: AppFromStore[];
  notFound: boolean;
  error: string | null;
};

const STORE_LABELS: Record<StoreKind, string> = {
  google_play: "Google Play",
  rustore: "RuStore",
};

export function AppPageClient({ packageName }: Props) {
  const router = useRouter();
  const [result, setResult] = useState<Result | null>(null);

  const isCurrent = result?.packageName === packageName;
  const loading = !isCurrent;
  const apps = isCurrent ? result!.apps : [];
  const notFound = isCurrent ? result!.notFound : false;
  const error = isCurrent ? result!.error : null;

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    const stores: readonly StoreKind[] = ["google_play", "rustore"];

    async function load() {
      const results = await Promise.allSettled(
        stores.map(async (store) => {
          const res = await authFetch(
            `/api/apps/${store}/${encodeURIComponent(packageName)}`,
            { cache: "no-store", signal: controller.signal },
          );
          if (res.status === 404) return null;
          if (!res.ok) throw new Error(`apps: ${res.status}`);
          const data = (await res.json()) as App;
          return { store, data };
        }),
      );

      if (cancelled) return;

      const found = results
        .filter(
          (r): r is PromiseFulfilledResult<AppFromStore | null> =>
            r.status === "fulfilled",
        )
        .map((r) => r.value)
        .filter((v): v is AppFromStore => v !== null);

      const failures = results.filter(
        (r): r is PromiseRejectedResult => r.status === "rejected",
      );

      if (failures.length > 0) {
        const reason = failures[0].reason;
        setResult({
          packageName,
          apps: [],
          notFound: false,
          error:
            reason instanceof Error && reason.message
              ? reason.message
              : "request failed",
        });
        return;
      }

      if (found.length === 0) {
        setResult({ packageName, apps: [], notFound: true, error: null });
        return;
      }

      setResult({ packageName, apps: found, notFound: false, error: null });
    }

    load();

    return () => {
      cancelled = true;
      controller.abort();
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
        <p className="text-muted-text">Приложение не найдено.</p>
      </main>
    );
  }

  if (error !== null) {
    return (
      <main className="mx-auto w-full max-w-6xl px-16 py-8">
        <ErrorView text={error} />
      </main>
    );
  }

  // Safe: we passed loading, notFound, and error guards, which means
  // setResult was called with the success branch → apps.length > 0.
  const primary = apps[0];

  return (
    <main className="mx-auto w-full max-w-6xl px-16 py-8">
      <div
        onClick={() => router.back()}
        className="mb-4 inline-flex items-center gap-2 text-base text-accent hover:underline cursor-pointer"
      >
        <ChevronLeft className="h-4 w-4" />
        Назад
      </div>

      <AppHeader
        name={primary.data.name}
        developer={primary.data.developer}
        package_name={primary.data.package_name}
        letter={primary.data.name.charAt(0).toUpperCase()}
        iconUrl={primary.data.icon_url}
        availableStore={STORE_LABELS[primary.store]}
      />

      <div className="mt-8">
        <AppDetailView
          stores={apps.map((app) => ({
            kind: app.store,
            label: STORE_LABELS[app.store],
            app: app.data,
          }))}
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
