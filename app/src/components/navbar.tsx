import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';

export function Navbar() {
  return (
    <div className="flex justify-center">
      <header className="fixed top-6 z-50 container rounded-full border-b bg-background/70 backdrop-blur-lg flex items-center justify-center px-8">
        <div className="container flex h-16 items-center justify-between w-full">
          <Logo className="flex" />
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="#funcionalidades" className="transition-colors hover:text-primary">
              Funcionalidades
            </Link>
            <Link href="#depoimentos" className="transition-colors hover:text-primary">
              Depoimentos
            </Link>
            <Link href="#precos" className="transition-colors hover:text-primary">
              Preços
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Entrar</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Começar</Link>
            </Button>
          </div>
        </div>
      </header>
    </div>
  );
}
