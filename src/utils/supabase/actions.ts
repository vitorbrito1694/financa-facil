"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClientForServer } from "@/utils/supabase/server";

const signInWith = (provider: "google") => async () => {
  console.log(`logando com ${provider}`);
  const supabase = await createClientForServer();

  const authCallbackUrl = `${process.env.NEXT_PUBLIC_URL}/auth/callback`;

  console.log(authCallbackUrl);

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: authCallbackUrl,
    },
  });

  console.log(data);

  if (error) {
    console.error("Error signing in with provider:", error);
    redirect("/error");
  }

  if (data.url) {
    redirect(data.url); // use the redirect API for your server framework
  }
};
export const signInWithGoogle = signInWith("google");

export async function emailLogin(formData: FormData) {
  const supabase = await createClientForServer();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/login?message=Could not log in with email and password");
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signup(formData: FormData) {
  const supabase = await createClientForServer();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/signup?message=Could not sign up with email and password");
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}
