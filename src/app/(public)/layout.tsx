"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { createClientForBrowser } from "@/utils/supabase/client";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { useAuth } from "@/contexts/auth-context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useAuth();

  return (
    <SidebarProvider>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 justify-center">
          <div className="container flex justify-between gap-2 items-center">
            <div>
              <Logo className="h-10" />
            </div>
            <div className="gap-2 flex items-center">
              {user && (
                <>
                  <span>Olá </span>
                  <Button variant={"default"} asChild>
                    <Link href="/dashboard">Ir para meu Dashboard</Link>
                  </Button>
                </>
              )}

              {!user && (
                <>
                  <Button variant={"default"} asChild>
                    <Link href="/login">Login</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
