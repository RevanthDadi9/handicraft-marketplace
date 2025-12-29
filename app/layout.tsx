import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/auth-provider";
import Link from "next/link";
import { auth } from "@/auth";
import { handleSignOut } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Toaster } from "sonner";
import { Badge } from "@/components/ui/badge";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KalaSync | Premium Handmade Marketplace",
  description: "Connect with the finest handmade service providers and creators.",
  manifest: "/manifest.json",
  appleWebApp: {
    title: "KalaSync",
    statusBarStyle: "black-translucent",
    capable: true,
  },
};

export const viewport = {
  themeColor: "#000000",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${playfair.variable} antialiased min-h-screen pt-20 selection:bg-primary/30 selection:text-primary-foreground`}
      >
        <AuthProvider>
          <nav className="fixed top-0 left-0 right-0 z-50 glass px-6 py-5 flex items-center justify-between border-b border-white/[0.06]">
            <Link href="/" className="logo-container group transition-all duration-300 hover:scale-102 active:scale-98">
              <div className="logo-icon-wrapper">
                <div className="logo-aura"></div>
                <img src="/icon.png" alt="Logo" className="logo-icon-animate" />
              </div>
              <span className="text-xl font-bold tracking-[0.2em] font-[family-name:var(--font-playfair)]">
                KALASYNC
              </span>
            </Link>
            <div className="flex items-center gap-8">
              <Link href="/creators" className="text-[10px] font-bold uppercase tracking-widest text-white/50 hover:text-primary transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0">Artisans</Link>
              {session?.user ? (
                <>
                  <Badge variant="outline" className={`
                    text-[10px] font-bold uppercase tracking-widest px-3 py-1 border 
                    ${(session.user as any)?.role === 'ADMIN'
                      ? "border-red-500 text-red-500 bg-red-500/10 shadow-[0_0_10px_rgba(239,68,68,0.2)]"
                      : (session.user as any)?.role === 'CREATOR'
                        ? "border-primary text-primary bg-primary/10 shadow-[0_0_10px_rgba(255,215,0,0.2)]"
                        : "border-blue-400 text-blue-400 bg-blue-400/10"}
                  `}>
                    {(session.user as any)?.role === 'ADMIN' ? "Elder" : (session.user as any)?.role === 'CREATOR' ? "Artisan" : "Patron"}
                  </Badge>
                  {(session.user as any)?.role === 'ADMIN' && (
                    <Link href="/admin" className="text-xs font-bold uppercase tracking-widest text-red-500/70 hover:text-red-500 transition-colors">Council</Link>
                  )}
                  <Link href="/dashboard" className="text-xs font-bold uppercase tracking-widest text-white/50 hover:text-primary transition-colors">Dashboard</Link>
                  <form action={handleSignOut}>
                    <Button variant="ghost" size="sm" className="text-[10px] font-bold uppercase tracking-[0.1em] text-white/30 hover:text-destructive transition-colors">Sign Out</Button>
                  </form>
                </>
              ) : (
                <Link href="/register">
                  <Button size="sm" className="btn-premium px-6 h-9 text-[10px] uppercase tracking-widest">Join Aura</Button>
                </Link>
              )}
            </div>
          </nav>
          <main>
            {children}
          </main>
          <Toaster position="top-center" richColors />
        </AuthProvider>
      </body>
    </html>
  );
}
