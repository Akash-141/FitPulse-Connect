import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FindGymPartnersButton } from "@/components/dashboard/find-gym-partners-button";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getSupabaseServerEnv } from "@/lib/supabase/env";
import type { User } from "@/types";

export default async function HomePage() {
  const { hasSupabaseEnv } = getSupabaseServerEnv();

  if (!hasSupabaseEnv) {
    redirect("/setup");
  }

  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, username, bio, fitness_level, location, avatar_url")
    .eq("id", user.id)
    .maybeSingle();

  const typedProfile = profile as User | null;

  const displayName = typedProfile?.username ?? user.email?.split("@")[0] ?? "Athlete";
  const fitnessLevel = typedProfile?.fitness_level ?? "Not set";
  const bio = typedProfile?.bio ?? "Add a bio to help gym partners understand your training style.";
  const locationData = typedProfile?.location;
  let location = "Location not set";

  if (
    locationData !== null &&
    typeof locationData?.lat === "number" &&
    typeof locationData?.lng === "number"
  ) {
    location = `${locationData.lat.toFixed(3)}, ${locationData.lng.toFixed(3)}`;
  }

  return (
    <main className="mx-auto min-h-[calc(100vh-4rem)] max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded-3xl border border-white/10 bg-slate-950/45 p-6 backdrop-blur-xl sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.35fr_0.9fr]">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.24em] text-fitness-300">Dashboard</p>
            <div className="space-y-3">
              <h1 className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Welcome, {displayName}
              </h1>
              <p className="max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                Stay consistent, discover compatible gym partners, and keep your progress visible.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <FindGymPartnersButton />
              <SignOutButton />
            </div>
          </div>

          <Card className="border-white/10 bg-slate-950/70 text-white shadow-none">
            <CardHeader>
              <CardTitle className="text-lg">Profile Snapshot</CardTitle>
              <CardDescription className="text-slate-400">Live data from your Supabase profile.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-300">
              <ProfileRow label="Username" value={displayName} />
              <ProfileRow label="Fitness level" value={fitnessLevel} />
              <ProfileRow label="Location" value={location} />
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Bio</p>
                <p className="mt-2 text-sm leading-6 text-slate-200">{bio}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        <FeatureCard title="Profile" description="Keep your identity and training style complete for better matching." cta="Update details" />
        <FeatureCard title="Workouts" description="Log sessions and exercise metadata to improve partner compatibility." cta="View workouts" />
        <FeatureCard title="Matches" description="Track pending and accepted requests as your network grows." cta="Open matches" />
      </section>
    </main>
  );
}

function FeatureCard({ title, description, cta }: { title: string; description: string; cta: string }) {
  return (
    <Card className="border-white/10 bg-slate-950/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-base text-white">{title}</CardTitle>
        <CardDescription className="text-slate-400">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant="secondary" className="w-full justify-start text-slate-100">
          {cta}
        </Button>
      </CardContent>
    </Card>
  );
}

function ProfileRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5">
      <span className="text-[11px] uppercase tracking-[0.2em] text-slate-500">{label}</span>
      <span className="text-right text-sm font-medium text-slate-100">{value}</span>
    </div>
  );
}