import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({ className, showText = false }: LogoProps) {
  return (
    <Link href="/">
      <div className="flex items-center gap-2">
        <Image
          src="/icons/financa-facil-logo.svg"
          alt="Finança Fácil Logo"
          width={150}
          height={50}
          className={cn('hidden xl:block w-auto', className)}
          priority
        />
        {showText && <span className="font-semibold text-xl">Finança Fácil</span>}
      </div>
    </Link>
  );
}
