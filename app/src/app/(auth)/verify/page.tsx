import { VerifyForm } from '@/features/auth/verify-form';

export default function VeridyPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-xs">
        <VerifyForm />
      </div>
    </div>
  );
}
