import { Card, CardContent } from "@/components/ui/card";

export default function Loading() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md border-white/10 bg-slate-950/55 backdrop-blur-xl">
        <CardContent className="space-y-4 p-6">
          <div className="h-4 w-32 animate-pulse rounded-full bg-white/10" />
          <div className="h-20 animate-pulse rounded-xl bg-white/5" />
          <div className="h-10 w-full animate-pulse rounded-xl bg-white/10" />
        </CardContent>
      </Card>
    </main>
  );
}