"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { Menu, X, LayoutDashboard, LogOut, User, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { handleSignOut } from "@/app/actions";

interface NavbarProps {
    session: any; // Using any for flexibility with auth session types
}

export function Navbar({ session }: NavbarProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isMobileMenuOpen]);

    return (
        <>
            <nav
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
                    isScrolled
                        ? "bg-background/80 backdrop-blur-md border-white/[0.08] py-4"
                        : "bg-transparent border-transparent py-6"
                )}
            >
                <div className="container mx-auto px-6 flex items-center justify-between">
                    <Link href="/" className="logo-container group relative z-50">
                        <div className="logo-icon-wrapper">
                            <img src="/icon.png" alt="Logo" className="logo-icon-animate" />
                        </div>
                        <span className="text-xl font-bold tracking-[0.2em] font-[family-name:var(--font-playfair)] text-foreground">
                            KALASYNC
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link
                            href="/creators"
                            className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-all duration-300 hover:-translate-y-0.5"
                        >
                            Artisans
                        </Link>

                        {session?.user ? (
                            <div className="flex items-center gap-4">
                                <Badge
                                    variant="outline"
                                    className={cn(
                                        "text-[10px] font-bold uppercase tracking-widest px-3 py-1 border",
                                        session.user?.role === "ADMIN"
                                            ? "border-red-500 text-red-500 bg-red-500/10 shadow-[0_0_10px_rgba(239,68,68,0.2)]"
                                            : session.user?.role === "CREATOR"
                                                ? "border-primary text-primary bg-primary/10 shadow-[0_0_10px_rgba(197,160,89,0.2)]"
                                                : "border-blue-400 text-blue-400 bg-blue-400/10"
                                    )}
                                >
                                    {session.user?.role === "ADMIN"
                                        ? "Elder"
                                        : session.user?.role === "CREATOR"
                                            ? "Artisan"
                                            : "Patron"}
                                </Badge>

                                {session.user?.role === "ADMIN" && (
                                    <Link
                                        href="/admin"
                                        className="text-[11px] font-bold uppercase tracking-widest text-red-500/70 hover:text-red-500 transition-colors"
                                    >
                                        Council
                                    </Link>
                                )}

                                <Link href="/dashboard">
                                    <Button variant="ghost" size="sm" className="h-9 px-4 text-[11px] font-bold uppercase tracking-widest text-primary hover:text-primary hover:bg-primary/10">
                                        Dashboard
                                    </Button>
                                </Link>

                                <form action={handleSignOut}>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-9 w-9 p-0 rounded-full hover:bg-destructive/10 hover:text-destructive transition-colors text-muted-foreground"
                                        title="Sign Out"
                                    >
                                        <LogOut size={16} />
                                    </Button>
                                </form>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link href="/login" className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
                                    Sign In
                                </Link>
                                <Link href="/register">
                                    <Button size="sm" className="btn-premium px-6 h-10 text-[10px] uppercase tracking-widest">
                                        Join Aura
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden relative z-50 p-2 text-foreground hover:text-primary transition-colors"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Full Screen Menu */}
            <div
                className={cn(
                    "fixed inset-0 z-40 bg-background/95 backdrop-blur-2xl flex flex-col justify-center items-center transition-all duration-500 md:hidden",
                    isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}
            >
                <div className="flex flex-col items-center gap-8 p-6 w-full max-w-sm text-center">
                    <Link
                        href="/creators"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-2xl font-[family-name:var(--font-playfair)] text-foreground hover:text-primary transition-colors flex items-center gap-3"
                    >
                        <Sparkles size={20} className="text-primary" />
                        Artisans
                    </Link>

                    {session?.user ? (
                        <>
                            <div className="w-12 h-[1px] bg-white/10 my-2"></div>

                            <Link
                                href="/dashboard"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-xl font-medium text-foreground/80 hover:text-primary transition-colors flex items-center gap-3"
                            >
                                <LayoutDashboard size={20} /> Dashboard
                            </Link>

                            {session.user?.role === "ADMIN" && (
                                <Link
                                    href="/admin"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-xl font-medium text-red-500/80 hover:text-red-500 transition-colors"
                                >
                                    Council Panel
                                </Link>
                            )}

                            <div className="flex flex-col items-center gap-2 mt-4">
                                <Badge
                                    variant="outline"
                                    className={cn(
                                        "text-xs font-bold uppercase tracking-widest px-4 py-1.5 border mb-6",
                                        session.user?.role === "ADMIN"
                                            ? "border-red-500 text-red-500 bg-red-500/10"
                                            : session.user?.role === "CREATOR"
                                                ? "border-primary text-primary bg-primary/10"
                                                : "border-blue-400 text-blue-400 bg-blue-400/10"
                                    )}
                                >
                                    Current Role: {session.user?.role === "ADMIN"
                                        ? "Elder"
                                        : session.user?.role === "CREATOR"
                                            ? "Artisan"
                                            : "Patron"}
                                </Badge>

                                <form action={handleSignOut} className="w-full">
                                    <Button
                                        variant="outline"
                                        className="w-full border-white/10 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30"
                                    >
                                        Sign Out
                                    </Button>
                                </form>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="w-12 h-[1px] bg-white/10 my-4"></div>
                            <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                                <Button variant="ghost" className="text-lg font-normal text-muted-foreground hover:text-foreground">
                                    Sign In
                                </Button>
                            </Link>
                            <Link href="/register" onClick={() => setIsMobileMenuOpen(false)} className="w-full">
                                <Button size="lg" className="btn-premium w-full text-sm uppercase tracking-widest">
                                    Join Aura
                                </Button>
                            </Link>
                        </>
                    )}
                </div>

                {/* Background decorative elements */}
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 blur-[100px] rounded-full -z-10"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/5 blur-[120px] rounded-full -z-10"></div>
            </div>
        </>
    );
}
