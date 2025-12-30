import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/auth-provider";
import Link from "next/link";
import { auth } from "@/auth";
import { handleSignOut } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
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
          <Navbar session={session} />
          <main className="min-h-screen">
            {children}
          </main>
          <Toaster position="top-center" richColors />
        </AuthProvider>
      </body>
    </html>
  );
}
