import { Suspense } from "react";
import { AuthForm } from "@/components/widgets/AuthForm/AuthForm";

export default function LoginPage() {
  return (
    <main className="flex flex-1 self-center w-full max-w-md flex-col items-center justify-start py-16 px-4">
      <Suspense fallback={null}>
        <AuthForm mode="login" />
      </Suspense>
    </main>
  );
}
