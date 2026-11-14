"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";
import { cn } from "@/lib/utils";

export type ProfileProps = {
  className?: string;
};

export function Profile({ className }: ProfileProps) {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();

  if (!user) return <Spinner />;

  const handleLogout = async () => {
    logout?.();
    router.push("/login");
  };

  return (
    <div className={cn(className, "mx-auto p-6 space-y-6")}>
      <div className="space-y-2">
        <div>
          <span className="text-sm text-muted-text">Ник</span>
          <div className="text-lg">{user.nickname}</div>
        </div>
        <div>
          <span className="text-sm text-muted-text">Email</span>
          <div className="text-lg">{user.email}</div>
        </div>
      </div>

      <Button onClick={handleLogout}>Выйти</Button>
    </div>
  );
}
