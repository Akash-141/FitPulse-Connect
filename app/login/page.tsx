import { AuthForm } from "@/components/auth/auth-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getSupabaseServerEnv } from "@/lib/supabase/env";

export default function LoginPage() {
  const { hasSupabaseEnv } = getSupabaseServerEnv();

  if (!hasSupabaseEnv) {
    return (
      <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl items-center px-4 py-10 sm:px-6 lg:px-8">
        <Card className="w-full border-white/10 bg-slate-950/55 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-2xl">Supabase Setup Required</CardTitle>
            <CardDescription>
              Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local, then restart the dev server.
            </CardDescription>
          </CardHeader>
        </Card>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid w-full gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <section className="space-y-6">
          <p className="text-xs uppercase tracking-[0.24em] text-fitness-300">Access</p>
          <div className="space-y-3">
            <h1 className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Login and start matching.
            </h1>
            <p className="max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
              Sign in to open your dashboard, manage workout data, and connect with gym partners who train like you.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <InfoTile title="Secure" text="Protected routes via middleware." />
            <InfoTile title="Unified" text="Single form for login and signup." />
            <InfoTile title="Synced" text="Profiles tied directly to auth users." />
          </div>
        </section>

        <Card className="border-white/10 bg-slate-950/60 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Access your account</CardTitle>
            <CardDescription className="text-slate-400">Use your email and password to continue.</CardDescription>
          </CardHeader>
          <CardContent>
            <AuthForm />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

function InfoTile({ title, text }: { title: string; text: string }) {
  return (
    <Card className="border-white/10 bg-slate-950/45">
      <CardHeader className="space-y-1 p-4">
        <CardTitle className="text-sm text-white">{title}</CardTitle>
        <CardDescription className="text-xs text-slate-400">{text}</CardDescription>
      </CardHeader>
    </Card>
  );
}