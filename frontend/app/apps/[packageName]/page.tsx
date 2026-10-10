import Link from "next/link";
import { notFound } from "next/navigation";
import { AppHeader } from "@/components/widgets/AppDetail/AppHeader";
import { StoreDataTable } from "@/components/widgets/AppDetail/StoreDataTable";
import { getApp } from "@/lib/api/apps";

type Props = {
  params: Promise<{ packageName: string }>;
};

export default async function AppPage({ params }: Props) {
  const { packageName } = await params;
  const app = await getApp(decodeURIComponent(packageName));
  if (!app) notFound();

  return (
    <main className="mx-auto w-full max-w-6xl px-16 py-8">
      <Link
        href="/"
        className="mb-4 inline-flex items-center gap-2 text-base text-blue-600 hover:underline"
      >
        <ChevronLeft className="h-4 w-4" />К результатам
      </Link>

      <AppHeader
        name={app.name}
        developer={app.developer}
        package_name={app.package_name}
        letter={app.name.charAt(0).toUpperCase()}
        availableStore="Google Play"
      />

      <div className="mt-8">
        <StoreDataTable data={app} />
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
