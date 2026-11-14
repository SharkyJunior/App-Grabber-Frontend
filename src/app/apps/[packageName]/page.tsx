import { AppPageClient } from "@/components/widgets/AppDetail/AppPageClient";
import { Metadata } from "next";

type Props = {
  params: Promise<{ packageName: string }>;
};

export const instant = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { packageName } = await params;
  const decodedName = decodeURIComponent(packageName);

  return {
    title: `${decodedName} — App Grabber`,
  };
}

export default async function AppPage({ params }: Props) {
  const { packageName } = await params;

  return <AppPageClient packageName={decodeURIComponent(packageName)} />;
}
