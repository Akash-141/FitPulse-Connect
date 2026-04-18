"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type AuthMode = "signin" | "signup";

export function AuthForm() {
  const router = useRouter();
  const hasSupabaseEnv = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  const [mode, setMode] = useState<AuthMode>("signin");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    if (!hasSupabaseEnv) {
      setError("Supabase environment variables are missing. Add them to .env.local and restart the app.");
      setIsLoading(false);
      return;
    }

    const supabase = createSupabaseBrowserClient();

    if (mode === "signup" && !username.trim()) {
      setError("Username is required for signup.");
      setIsLoading(false);
      return;
    }

    const authResult =
      mode === "signup"
        ? await supabase.auth.signUp({
            email,
            password,
            options: {
              data: { username: username.trim() },
            },
          })
        : await supabase.auth.signInWithPassword({
            email,
            password,
          });

    setIsLoading(false);

    if (authResult.error) {
      setError(authResult.error.message);
      return;
    }

    if (mode === "signup") {
      setSuccess("Account created. Check your email if confirmation is enabled.");
    } else {
      router.replace("/");
      router.refresh();
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {mode === "signup" && (
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input id="username" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="yourhandle" autoComplete="username" />
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" autoComplete="email" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="••••••••" autoComplete={mode === "signup" ? "new-password" : "current-password"} required />
      </div>

      {error ? <p className="text-sm text-red-400">{error}</p> : null}
      {success ? <p className="text-sm text-fitness-300">{success}</p> : null}

      <Button type="submit" className="w-full" disabled={isLoading || !hasSupabaseEnv}>
        {isLoading ? "Please wait..." : mode === "signup" ? "Create account" : "Sign in"}
      </Button>

      <Button
        type="button"
        variant="secondary"
        className="w-full"
        onClick={() => {
          setMode(mode === "signin" ? "signup" : "signin");
          setError(null);
          setSuccess(null);
        }}
      >
        {mode === "signin" ? "Need an account? Sign up" : "Already have an account? Sign in"}
      </Button>
    </form>
  );
}