"use client";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { authFetch } from "@/lib/api/authFetch";
import type { FavoritesPage } from "@/lib/api/favorites";
import { ACTIVE_STORE } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { FavoriteOffIcon, FavoriteOnIcon } from "@/components/icons";
import { useAuthStore } from "@/stores/useAuthStore";

type Props = { packageName: string };

export function FavoriteButton({ packageName }: Props) {
  const { status } = useAuthStore();
  const [isFavorite, setIsFavorite] = useState<boolean | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;
    authFetch("/api/favorites?limit=100")
      .then(async (res) => {
        if (cancelled) return;
        if (!res.ok) return setIsFavorite(false);
        const data: FavoritesPage = await res.json();
        setIsFavorite(
          data.favorites.some((f) => f.app.package_name === packageName),
        );
      })
      .catch(() => {
        if (!cancelled) setIsFavorite(false);
      });
    return () => {
      cancelled = true;
    };
  }, [packageName]);

  const toggle = async () => {
    if (status !== "authenticated") redirect("/login");
    if (isFavorite == null || busy) return;
    setBusy(true);
    try {
      const method = isFavorite ? "DELETE" : "PUT";
      const res = await authFetch(
        `/api/favorites/${ACTIVE_STORE}/${packageName}`,
        { method },
      );
      if (res.ok) setIsFavorite(!isFavorite);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Button
      iconOnly
      className="flex items-center justify-center bg-transparent text-pink-500 hover:bg-transparent hover:text-pink-400"
      onClick={toggle}
      disabled={isFavorite == null || busy}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      {isFavorite ? (
        <FavoriteOnIcon className="w-6 h-6 block" />
      ) : (
        <FavoriteOffIcon className="w-6 h-6 block" />
      )}
    </Button>
  );
}
