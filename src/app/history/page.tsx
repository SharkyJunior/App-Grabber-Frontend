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
    <main className="flex flex-1 self-center w-full max-w-7xl flex-col items-center justify-start gap-2 py-16 px-16 sm:items-start">
      <h1 className="text-2xl font-semibold mb-4">История просмотров</h1>
      {!items.length && <p className="text-gray-500">Пока нет просмотров.</p>}
      {items.map((v) => (
        <Link
          key={v.id}
          href={`/apps/${v.app.package_name}`}
          className={`w-full flex items-center justify-between bg-white border-2 border-gray-200 rounded-lg p-3 hover:bg-gray-50 `}
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
              <span className="ml-2 text-sm text-gray-500">×{v.count}</span>
            )}
          </div>
          <span className="text-sm text-gray-500">
            {formatRussianRelative(v.viewed_at)}
          </span>
        </Link>
      ))}
    </main>
  );
}
