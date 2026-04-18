import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";
import Script from "next/script";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "FitPulse Connect",
  description: "Fitness and gym-partner matching PWA built with Next.js and Supabase.",
  applicationName: "FitPulse Connect",
};

export const viewport: Viewport = {
  themeColor: "#020617",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${sans.variable} ${display.variable} font-sans`}>
        <Script
          id="fitpulse-theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('fitpulse-theme');var theme=t==='light'?'light':'dark';var r=document.documentElement;r.classList.toggle('dark',theme==='dark');r.style.colorScheme=theme;}catch(e){}})();`,
          }}
        />
        <SiteHeader />
        <div className="pt-16">{children}</div>
      </body>
    </html>
  );
}