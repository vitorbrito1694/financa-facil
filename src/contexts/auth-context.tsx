"use client";

import { createClientForBrowser } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: User | null;
  error: Error | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (formData: FormData) => Promise<void>;
  signup: (formData: FormData) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const supabase = createClientForBrowser();

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    // Listen for changes on auth state (sign in, sign out, etc.)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

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
  const signInWithGoogle = signInWith("google");

  async function signInWithEmail(formData: FormData) {
    const supabase = createClientForBrowser();

    const signunData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const { data, error } = await supabase.auth.signInWithPassword(signunData);

    if (error) {
      console.error("Error loging with email:", error);
    }

    if (data?.user) {
      router.push("/dashboard");
    }
  }

  async function signup(formData: FormData) {
    const supabase = createClientForBrowser();

    const signupData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const { data, error } = await supabase.auth.signUp(signupData);

    if (error) {
      console.error("Error signup with email:", error);
    }

    if (data?.user) {
      router.push("/login");
    }
  }

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      router.push("/login");
    } catch (error) {
      setError(error as Error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        isLoading,
        signInWithGoogle,
        signInWithEmail,
        signup,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
