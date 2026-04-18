import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SetupPage() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-4xl items-center px-4 py-10 sm:px-6 lg:px-8">
      <Card className="w-full border-white/10 bg-slate-950/55 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="font-display text-2xl text-white">Supabase Configuration Needed</CardTitle>
          <CardDescription className="text-slate-400">
            This project needs Supabase credentials before auth and dashboard features can run.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-slate-300">
          <p>Create a .env.local file in the project root and add:</p>
          <pre className="overflow-auto rounded-xl border border-white/10 bg-slate-900/70 p-4 text-slate-200">
{`NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY`}
          </pre>
          <p>Then restart the dev server with npm run dev.</p>
        </CardContent>
      </Card>
    </main>
  );
}