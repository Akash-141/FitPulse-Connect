import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";

const navLinks = [
  { href: "/", label: "Dashboard" },
  { href: "/partners", label: "Find Partners" },
  { href: "/setup", label: "Setup" },
];

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="min-w-0">
          <Link
            href="/"
            className="font-display text-lg font-semibold tracking-tight text-white transition-colors hover:text-fitness-200"
          >
            FitPulse Connect
          </Link>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-300 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild size="sm" className="h-9 px-4">
            <Link href="/login">Login / Signup</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}