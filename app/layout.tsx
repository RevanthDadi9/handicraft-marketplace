import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/auth-provider";
import Link from "next/link";
import { auth } from "@/auth";
import { handleSignOut } from "@/app/actions";
import { Button } from "@/components/ui/button";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AuraCraft | Premium Handmade Marketplace",
  description: "Connect with the finest handmade service providers and creators.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${playfair.variable} antialiased min-h-screen pt-20`}
      >
        <AuthProvider>
          <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5 px-6 py-4 flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold tracking-tighter text-gradient font-[family-name:var(--font-playfair)]">
              AURACRAFT
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/creators" className="text-sm font-medium hover:text-primary transition-colors">Find Artists</Link>
              {session ? (
                <>
                  <Link href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">Dashboard</Link>
                  <form action={handleSignOut}>
                    <Button variant="ghost" size="sm" className="text-xs">Sign Out</Button>
                  </form>
                </>
              ) : (
                <Link href="/register">
                  <Button size="sm" className="rounded-full px-6">Join Aura</Button>
                </Link>
              )}
            </div>
          </nav>
          <main>
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
