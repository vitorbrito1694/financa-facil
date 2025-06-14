"use client";

import { useAuth } from "@/contexts/auth-context";
import { LoginForm } from "../../../components/login-form";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  if (user && !isLoading) {
    router.push("/dashboard");
    return null;
  }

  if (!user && !isLoading) {
    return (
      <div className="flex min-h-[calc(60vh)] md:min-h-[calc(60vh)] w-full items-center justify-center p-4 md:p-10">
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>
    );
  }
}
