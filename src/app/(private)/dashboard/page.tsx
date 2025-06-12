// import { createClientForServer } from "@/lib/supabase/server";
// import { redirect } from "next/navigation";

export default function DashboardPage() {
  // const supabase = await createClientForServer();
  // const { data, error } = await supabase.auth.getUser();
  // console.log(data, error);

  // if (error) {
  //   console.log(error.message);
  //   // redirect("/login");
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       <div className="text-center">
  //         <h2 className="text-2xl font-bold text-red-600 mb-4">Erro</h2>
  //         <p className="text-gray-600">{error.message}</p>
  //       </div>
  //     </div>
  //   );
  // }

  // const user = data.user;
  // if (!user) {
  //   console.log("Usuário não autenticado");
  //   redirect("/login");
  // }

  // if (user) {
  //   console.log(user);
  // }

  return (
    <div className="grid auto-rows-min gap-4 md:grid-cols-3">
      <div className="aspect-video rounded-xl bg-zinc-100/50 dark:bg-zinc-800/50" />
      <div className="aspect-video rounded-xl bg-zinc-100/50 dark:bg-zinc-800/50" />
      <div className="aspect-video rounded-xl bg-zinc-100/50 dark:bg-zinc-800/50" />
    </div>
  );
}
