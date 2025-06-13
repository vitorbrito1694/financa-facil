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
import { signup } from "@/utils/supabase/client-actions";

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = new FormData();

    formData.append("first-name", data.first_name);
    formData.append("last-name", data.last_name);
    formData.append("email", data.email);
    formData.append("password", data.password);

    signup(formData);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Novo Cadastro</CardTitle>
          <CardDescription>
            Insira seus dados para criar uma conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2 grid-cols-2">
                <div>
                  <Label htmlFor="first_name">Primeiro Nome</Label>
                  <Input
                    {...register("first_name", { required: true })}
                    id="first_name"
                    type="text"
                    name="first_name"
                    placeholder="João"
                    required
                  />
                  {errors.first_name && <span>O seu nome é obrigatório.</span>}
                </div>
                <div>
                  <Label htmlFor="last_name">Sobrenome</Label>
                  <Input
                    {...register("last_name")}
                    id="last_name"
                    type="text"
                    name="last_name"
                    placeholder="Da Silva"
                    required
                  />
                </div>
              </div>
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
                  <Link
                    href="/reset"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Esqueçeu sua senha?
                  </Link>
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
                Concluir Cadastro
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Já possui uma conta?{" "}
              <Link href="/login" className="underline underline-offset-4">
                Entrar
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
