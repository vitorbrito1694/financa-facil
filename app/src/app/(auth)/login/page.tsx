import { LoginForm } from '@/features/auth/login-form';

export default function LoginPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center p-4 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
