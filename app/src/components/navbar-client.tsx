'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { logoutAction } from '@/features/auth/actions';
import { cn } from '@/lib/utils';

interface NavbarClientProps {
  isAuthenticated: boolean;
}

export function NavbarClient({ isAuthenticated }: NavbarClientProps) {
  const pathname = usePathname();
  const isPublicRoute = ['/login', '/signup', '/verify', '/'].includes(pathname);

  if (isAuthenticated && !isPublicRoute) {
    return (
      <>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/dashboard" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(navigationMenuTriggerStyle(), pathname === '/dashboard' && 'bg-accent/50')}
                >
                  Dashboard
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/transactions" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(navigationMenuTriggerStyle(), pathname.startsWith('/transactions') && 'bg-accent/50')}
                >
                  Transações
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/accounts" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(navigationMenuTriggerStyle(), pathname.startsWith('/accounts') && 'bg-accent/50')}
                >
                  Contas
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/settings" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(navigationMenuTriggerStyle(), pathname.startsWith('/settings') && 'bg-accent/50')}
                >
                  Configurações
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center gap-4">
          <form action={logoutAction}>
            <Button variant="outline">Sair</Button>
          </form>
        </div>
      </>
    );
  }

  return (
    <>
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
        {isAuthenticated ? (
          <>
            <form action={logoutAction}>
              <Button variant="outline">Sair</Button>
            </form>
            <Button asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </>
        ) : (
          <>
            <Button variant="ghost" asChild>
              <Link href="/login">Entrar</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Começar</Link>
            </Button>
          </>
        )}
      </div>
    </>
  );
}
