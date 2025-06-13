"use client";

import { createClientForBrowser } from "@/utils/supabase/client";

const signInWith = (provider: "google") => async () => {
  console.log(`logando com ${provider}`);
  const supabase = await createClientForBrowser();

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
  }
};
export const signInWithGoogle = signInWith("google");

export async function emailLogin(formData: FormData) {
  const supabase = createClientForBrowser();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  console.log(data);

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.error("Error loging with email:", error);
  }
}

export async function signup(formData: FormData) {
  console.log(formData);
  const supabase = createClientForBrowser();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    console.error("Error signup with email:", error);
  }
}
