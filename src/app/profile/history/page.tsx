"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authFetch } from "@/lib/api/authFetch";
import type { HistoryPage, View } from "@/lib/api/history";
import { useAuthStore } from "@/stores/useAuthStore";
import { Spinner } from "@/components/ui/Spinner";
import { Error as ErrorView } from "@/components/ui/Error";
import Image from "next/image";
import { formatRussianRelative } from "@/lib/utils";

type GroupedView = View & { count: number };

function groupConsecutive(history: View[]): GroupedView[] {
  const result: GroupedView[] = [];
  for (const v of history) {
    const last = result[result.length - 1];
    if (last && last.app.package_name === v.app.package_name) {
      last.count += 1; // extend the running run
    } else {
      result.push({ ...v, count: 1 }); // start a new run
    }
  }
  return result;
}

export default function HistoryPage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const [items, setItems] = useState<GroupedView[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      router.replace("/login");
      return;
    }
    let cancelled = false;
    authFetch("/api/history?limit=100")
      .then(async (res) => {
        if (cancelled) return;
        if (!res.ok) throw new Error(`history: ${res.status}`);
        const data: HistoryPage = await res.json();
        setItems(groupConsecutive(data.history));
      })
      .catch((e) => {
        if (!cancelled) setError(e.message);
      });
    return () => {
      cancelled = true;
    };
  }, [user, router]);

  if (error) return <ErrorView text={error} />;
  if (!items) return <Spinner />;

  return (
    <div className="flex w-full flex-col items-center justify-start gap-2 sm:items-start">
      <h2 className="text-2xl font-semibold mb-4">История просмотров</h2>
      {!items.length && <p className="text-muted-text">Пока нет просмотров.</p>}
      {items.map((v) => (
        <Link
          key={v.id}
          href={`/apps/${v.app.package_name}`}
          className={`w-full flex items-center justify-between bg-card border border-border rounded-lg p-3 hover:bg-surface-hover `}
        >
          <div className="flex items-center gap-3">
            <Image
              src={v.app.icon_url}
              alt=""
              width="96"
              height="96"
              className="w-8 h-8 rounded"
            />
            <span className="font-medium">{v.app.name}</span>
            {v.count > 1 && (
              <span className="ml-2 text-sm text-muted-text">×{v.count}</span>
            )}
          </div>
          <span className="text-sm text-muted-text">
            {formatRussianRelative(v.viewed_at)}
          </span>
        </Link>
      ))}
    </div>
  );
}
