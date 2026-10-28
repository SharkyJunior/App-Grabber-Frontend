import { Profile } from "@/components/widgets/Profile/Profile";

export default function ProfilePage() {
  return (
    <main className="flex flex-1 self-center w-full max-w-7xl flex-col items-center justify-start gap-4 py-16 px-16 sm:items-start">
      <Profile className="w-dvh"/>
    </main>
  );
}
