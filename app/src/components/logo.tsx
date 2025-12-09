import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <Link href="/">
      <Image
        src="/icons/financa-facil-logo.svg"
        alt="Finança Fácil Logo"
        width={120}
        height={40}
        className={cn('hidden xl:block', className)}
        priority
        style={{
          width: '100%',
          height: '50px',
        }}
      />
    </Link>
  );
}
