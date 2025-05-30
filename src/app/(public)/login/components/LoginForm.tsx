"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = (data: any) => {
    const formData = new FormData();

    formData.append("email", data.email);
    formData.append("name", data.password);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Entrar</CardTitle>
          <CardDescription>
            Insira Email e senha para acessar sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  {...register("email", { required: true })}
                  id="email"
                  type="email"
                  name="email"
                  placeholder="meuemail@exemplo.com"
                  required
                />
                {errors.email && <span>O e-mail é obrigatório.</span>}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Senha</Label>
                  <a
                    href="/reset"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Esqueçeu sua senha?
                  </a>
                </div>
                <Input
                  {...register("password", { required: true })}
                  id="password"
                  type="password"
                  name="password"
                  required
                />
                {errors.password && <span>A senha é obrigatória.</span>}
              </div>
              <Button type="submit" className="w-full">
                Entrar
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Não tem uma conta?{" "}
              <Link href="/signup" className="underline underline-offset-4">
                Cadastrar-se
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
