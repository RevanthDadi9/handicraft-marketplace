import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Scissors, Palette, Sparkles, Layers } from "lucide-react";

export default async function Home() {
  const session = await auth();

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 md:pt-32 md:pb-48 px-6 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.08)_0%,transparent_70%)]" />

        <div className="container mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 mb-8 animate-bounce-slow">
            <Sparkles size={14} className="text-primary" />
            <span className="text-xs font-bold tracking-widest uppercase text-white/70">Modernizing Craftsmanship</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-tight font-[family-name:var(--font-playfair)]">
            Precision in Every <br />
            <span className="text-gradient">Stitch & Stroke</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
            The world's most elegant marketplace for handmade services. <br className="hidden md:block" />
            Connect with elite creators who bring your unique visions to life.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/creators">
              <Button size="lg" className="rounded-full px-12 h-14 text-lg font-bold glow-border overflow-visible group">
                Discover Artists <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
            {!session && (
              <Link href="/register">
                <Button variant="outline" size="lg" className="rounded-full px-12 h-14 text-lg border-white/10 hover:bg-white/5">
                  Join as Creator
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* 3D Feature Grid */}
      <section className="py-24 px-6 bg-black/40">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-3d group">
              <div className="card-3d-content glass-card p-10 h-full">
                <Scissors className="text-primary mb-6" size={40} />
                <h3 className="text-2xl font-bold mb-4">Masterful Stitching</h3>
                <p className="text-muted-foreground">Premium embroidery, tailoring, and fabric arts from verified specialists.</p>
              </div>
            </div>
            <div className="card-3d group">
              <div className="card-3d-content glass-card p-10 h-full">
                <Palette className="text-primary mb-6" size={40} />
                <h3 className="text-2xl font-bold mb-4">Bespoke Design</h3>
                <p className="text-muted-foreground">Collaborate on unique patterns and aesthetic designs tailored to you.</p>
              </div>
            </div>
            <div className="card-3d group">
              <div className="card-3d-content glass-card p-10 h-full">
                <Layers className="text-primary mb-6" size={40} />
                <h3 className="text-2xl font-bold mb-4">Visual Proofing</h3>
                <p className="text-muted-foreground">Review progress at every step with our integrated high-res image sharing.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern CTA */}
      <section className="py-24 px-6 text-center">
        <div className="glass-card max-w-5xl mx-auto p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] -z-10" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-[family-name:var(--font-playfair)]">Ready to craft your legacy?</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">Join the exclusive community of artisans and customers building the future of handmade.</p>
          <Link href="/register">
            <Button size="lg" className="rounded-full px-12 h-14 text-lg">Express Interest</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
