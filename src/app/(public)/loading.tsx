import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingLoginButton() {
  return (
    <div className="flex items-center justify-center h-screen ">
      {/* // TODO - Ajustar skeleton para a pagina */}
      <Skeleton className="h-9 w-14 rounded-md" />
    </div>
  );
}
