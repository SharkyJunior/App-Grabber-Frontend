"use client";
import { useEffect, useState } from "react";
import { authFetch } from "@/lib/api/authFetch";
import type { FavoritesPage } from "@/lib/api/favorites";
import { ACTIVE_STORE } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

type Props = { packageName: string };

export function FavoriteButton({ packageName }: Props) {
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
    <Button onClick={toggle} disabled={isFavorite == null || busy}>
      {isFavorite ? "★ В избранном" : "☆ В избранное"}
    </Button>
  );
}
