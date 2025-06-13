import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest } from "next/server";
import { createClientForServer } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  const type = searchParams.get("type") as EmailOtpType | null;
  const email = searchParams.get("email");
  const next = searchParams.get("next") ?? "/dashboard";

  console.log("Confirming email with:", { token, type, next });

  if (!token || !type || !email) {
    console.log("Missing token or type");
    redirect("/login?message=Missing token or type");
  }

  const supabase = await createClientForServer();

  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type,
    options: {
      redirectTo: next,
    },
  });

  if (error) {
    console.error("Error verifying OTP:", error);
    redirect("/login?message=" + encodeURIComponent(error.message));
  }

  // Verification successful
  console.log("Email verified successfully");
  redirect(next);
}
