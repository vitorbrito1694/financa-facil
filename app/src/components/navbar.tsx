import { Logo } from '@/components/logo';
import { cookies } from 'next/headers';
import { NavbarClient } from './navbar-client';

export function Navbar() {
  const isAuthenticated = cookies().has('auth');

  return (
    <div className="flex justify-center">
      <header className="fixed top-6 z-50 container rounded-full border-b bg-background/70 backdrop-blur-md flex items-center justify-center px-8 w-[90%] md:w-full">
        <div className="container flex h-16 items-center justify-between w-full gap-4">
          <Logo className="flex" />
          <NavbarClient isAuthenticated={isAuthenticated} />
        </div>
      </header>
    </div>
  );
}
