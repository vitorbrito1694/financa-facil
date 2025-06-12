"use client";

import Link from "next/link";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 justify-center">
          <div className="container flex justify-between gap-2 items-center">
            <div>
              <Logo className="h-10" />
            </div>
            <div className="gap-2 flex items-center">
              <Button variant={"ghost"} asChild>
                <Link href="/dashboard">Ir para meu Dashboard</Link>
              </Button>
            </div>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
