import { SignUpForm } from "./components/SignUpForm";

export default function SignUpPage() {
  return (
    <div className="flex min-h-[calc(100vh-6rem)] w-full items-center justify-center p-4 md:p-10">
      <div className="w-full max-w-sm">
        <SignUpForm />
      </div>
    </div>
  );
}
