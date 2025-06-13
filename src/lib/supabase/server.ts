"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClientForServer() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
      },
    }
  );
}
