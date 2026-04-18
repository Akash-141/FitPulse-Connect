import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PartnersPage() {
  return (
    <main className="mx-auto min-h-[calc(100vh-4rem)] max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded-3xl border border-white/10 bg-slate-950/45 p-6 backdrop-blur-xl sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.24em] text-fitness-300">Partner Discovery</p>
            <h1 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">Find Gym Partners</h1>
            <p className="max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">Review nearby athletes and send connection requests directly from this page.</p>
          </div>
          <Button className="w-full sm:w-auto">Refresh nearby list</Button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <PartnerCard name="Maya" level="Intermediate" focus="Hypertrophy" location="2.1 km away" />
          <PartnerCard name="Daniel" level="Advanced" focus="Powerlifting" location="3.8 km away" />
          <PartnerCard name="Ava" level="Beginner" focus="Cardio" location="1.4 km away" />
        </div>
      </section>
    </main>
  );
}

function PartnerCard({
  name,
  level,
  focus,
  location,
}: {
  name: string;
  level: string;
  focus: string;
  location: string;
}) {
  return (
    <Card className="border-white/10 bg-slate-950/70 text-white">
      <CardHeader>
        <CardTitle className="text-lg">{name}</CardTitle>
        <CardDescription className="text-slate-400">
          {level} · {focus}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-between text-sm text-slate-300">
        <span>{location}</span>
        <Button variant="secondary" size="sm">
          Connect
        </Button>
      </CardContent>
    </Card>
  );
}