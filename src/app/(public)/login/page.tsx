import { LoginForm } from "./components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(60vh)] md:min-h-[calc(60vh)] w-full items-center justify-center p-4 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
