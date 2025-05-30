"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      // Verifica se o usuário está autenticado
    };

    checkAuth();
  }, [router]);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Erro</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid auto-rows-min gap-4 md:grid-cols-3">
      <div className="aspect-video rounded-xl bg-zinc-100/50 dark:bg-zinc-800/50" />
      <div className="aspect-video rounded-xl bg-zinc-100/50 dark:bg-zinc-800/50" />
      <div className="aspect-video rounded-xl bg-zinc-100/50 dark:bg-zinc-800/50" />
    </div>
  );
}
