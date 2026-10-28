"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authFetch } from "@/lib/api/authFetch";
import type { Favorite, FavoritesPage } from "@/lib/api/favorites";
import { ACTIVE_STORE } from "@/lib/constants";
import { useAuthStore } from "@/stores/useAuthStore";
import { Spinner } from "@/components/ui/Spinner";
import { Error as ErrorView } from "@/components/ui/Error";
import { ResultCard } from "@/components/widgets/ResultsWidget";

export default function FavoritesPage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const [items, setItems] = useState<Favorite[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      router.replace("/login");
      return;
    }
    let cancelled = false;
    authFetch("/api/favorites?limit=100")
      .then(async (res) => {
        if (cancelled) return;
        if (!res.ok) throw new Error(`favorites: ${res.status}`);
        const data: FavoritesPage = await res.json();
        setItems(data.favorites);
      })
      .catch((e) => {
        if (!cancelled) setError(e.message);
      });
    return () => {
      cancelled = true;
    };
  }, [user, router]);

  const handleRemove = async (packageName: string) => {
    const res = await authFetch(
      `/api/favorites/${ACTIVE_STORE}/${packageName}`,
      { method: "DELETE" },
    );
    if (res.ok) {
      setItems(
        (prev) =>
          prev?.filter((f) => f.app.package_name !== packageName) ?? null,
      );
    }
  };

  if (error) return <ErrorView text={error} />;
  if (!items) return <Spinner />;

  return (
    <main className="flex flex-1 self-center w-full max-w-7xl flex-col items-center justify-start gap-4 py-16 px-16 sm:items-start">
      <h1 className="text-2xl font-semibold">Избранное</h1>
      {!items.length && <p className="text-gray-500">Пока пусто.</p>}
      {items.map((f) => (
        <ResultCard
          className="w-full"
          key={f.store_app_id}
          variant="favorite"
          app={f.app}
          onRemoveFromFavs={handleRemove}
        />
      ))}
    </main>
  );
}
