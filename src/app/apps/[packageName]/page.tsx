import { AppPageClient } from "@/components/widgets/AppDetail/AppPageClient";

type Props = {
  params: Promise<{ packageName: string }>;
};

export const instant = false;

export default async function AppPage({ params }: Props) {
  const { packageName } = await params;

  return <AppPageClient packageName={decodeURIComponent(packageName)} />;
}
