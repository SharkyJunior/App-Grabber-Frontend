import { ProfileNav } from "@/components/widgets/Profile/ProfileNav";

export default function ProfileLayout({ children }: LayoutProps<"/profile">) {
  return (
    <main className="flex flex-1 self-center w-full max-w-7xl flex-col items-stretch justify-start gap-6 py-16 px-16">
      <header>
        <h1 className="text-2xl font-semibold">Профиль</h1>
      </header>
      <div className="flex w-full flex-col gap-6 md:flex-row md:items-start md:gap-10">
        <ProfileNav />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </main>
  );
}
