import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Tabs } from "@/components/ui/Tabs";
import { SessionManager } from "@/components/widgets/SessionManager/SessionManager";
import { UserMenu } from "@/components/widgets/UserMenu/UserMenu";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "App Grabber",
  description:
    "Search any app and compare the results from different app stores",
};

const NAV_ITEMS = [
  { href: "/", label: "Поиск" },
  { href: "/compare", label: "Сравнение" },
  { href: "/statuses", label: "Состояния" },
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <header className="sticky top-0 z-10 h-16 bg-surface border-b border-border">
          <div className="mx-auto flex h-full w-full max-w-7xl items-center gap-10 px-4 sm:px-8 lg:px-16">
            <div className="flex items-center gap-4">
              <Image
                src="/icon.svg"
                width={32}
                height={32}
                alt="App Grabber Icon"
              />
              <Link
                href="/"
                className="self-center text-[20px] font-medium text-foreground hover:text-accent transition-colors"
              >
                App Grabber
              </Link>
            </div>
            <Suspense fallback={null}>
              <Tabs items={NAV_ITEMS} />
            </Suspense>
            <UserMenu />
          </div>
        </header>
        {children}
        <SessionManager />

        <footer></footer>
      </body>
    </html>
  );
}
