import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, Zap, Globe } from "lucide-react";

export default async function Home() {
  const session = await auth();

  return (
    <div className="relative overflow-hidden">
      {/* Living Workshop Background Elements */}
      {/* Living Workshop: Choreographed Composition */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden mask-radial-edges">
        {/* Maggam Work - Deep Focus (Top Left) */}
        <div
          className="absolute top-[10%] left-[-5%] w-72 h-72 md:w-[28rem] md:h-[28rem] animate-artisan-float"
          style={{ '--duration': '14s', '--rotation': '8deg', '--opacity': '0.12', '--blur-min': '2px', '--blur-max': '4px' } as any}
        >
          <img
            src="https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&q=80&w=800"
            alt="Handmade Maggam Work"
            className="w-full h-full object-cover rounded-[3rem] shadow-2xl"
          />
        </div>

        {/* Stitching Machine - Mid Focus (Bottom Right) */}
        <div
          className="absolute bottom-[15%] right-[-5%] w-64 h-64 md:w-[24rem] md:h-[24rem] animate-artisan-float"
          style={{ '--duration': '11s', '--rotation': '-12deg', '--opacity': '0.1', '--delay': '2s', '--blur-min': '1px', '--blur-max': '3px' } as any}
        >
          <img
            src="https://images.unsplash.com/photo-1517423568366-8b83523034fd?auto=format&fit=crop&q=80&w=800"
            alt="Artisan Stitching"
            className="w-full h-full object-cover rounded-[2rem] shadow-2xl"
          />
        </div>

        {/* Tailoring Detail - Distant Focus (Top Right) */}
        <div
          className="absolute top-[15%] right-[10%] w-40 h-40 md:w-64 md:h-64 animate-artisan-float"
          style={{ '--duration': '18s', '--rotation': '-5deg', '--opacity': '0.06', '--delay': '1s', '--blur-min': '3px', '--blur-max': '6px' } as any}
        >
          <img
            src="https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?auto=format&fit=crop&q=80&w=800"
            alt="Professional Tailoring"
            className="w-full h-full object-cover rounded-full shadow-xl"
          />
        </div>

        {/* Maggam Detail - Close Focus (Bottom Left) */}
        <div
          className="absolute bottom-[20%] left-[15%] w-48 h-48 md:w-80 md:h-80 animate-artisan-float"
          style={{ '--duration': '10s', '--rotation': '15deg', '--opacity': '0.08', '--delay': '3s', '--blur-min': '1px', '--blur-max': '2px' } as any}
        >
          <img
            src="https://images.unsplash.com/photo-1623091410901-00e2d2689512?auto=format&fit=crop&q=80&w=800"
            alt="Maggam Detail"
            className="w-full h-full object-cover rounded-2xl shadow-xl"
          />
        </div>

        {/* Dynamic Artisan Light Trails */}
        <div className="absolute top-0 right-[25%] w-[1px] h-full bg-gradient-to-b from-transparent via-primary/10 to-transparent rotate-12 blur-[1px]"></div>
        <div className="absolute top-0 left-[25%] w-[1px] h-full bg-gradient-to-b from-transparent via-primary/5 to-transparent -rotate-12 blur-[2px]"></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-40 px-6">
        <div className="container mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/[0.08] mb-10 shadow-[0_0_20px_rgba(197,160,89,0.1)]">
            <Sparkles size={12} className="text-primary animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/50">Synchronizing Global Talent</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight mb-10 leading-[1.1] font-[family-name:var(--font-playfair)]">
            Mastery in <br />
            <span className="text-gold-gradient italic">Perfect Sync</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-14 leading-relaxed font-light">
            Welcome to <span className="text-white font-medium">KalaSync</span>. A curated collective where
            traditional craftsmanship meets digital precision. Connect with the world's finest artisans.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link href="/creators">
              <Button size="lg" className="btn-premium">
                Explore Artistry <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            {!session && (
              <Link href="/register">
                <Button variant="outline" size="lg" className="btn-secondary">
                  Join the Collective
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Brand Pillar Section */}
      <section className="py-32 px-6 border-y border-white/[0.05] bg-white/[0.01] relative overflow-hidden">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-[family-name:var(--font-playfair)]">The KalaSync Protocol</h2>
            <p className="text-muted-foreground text-sm max-w-lg mx-auto font-light">Elevating the standard of handmade commerce through trust and transparency.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="glass-card p-10 space-y-6 group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <ShieldCheck className="text-primary w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold">Verified Masters</h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-light">Every artisan undergoes the Council Review to ensure only authentic mastery enters the collective.</p>
            </div>

            <div className="glass-card p-10 space-y-6 group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Zap className="text-primary w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold">Real-time Crafting</h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-light">Experience the sync. Get milestone updates and direct artisan communication throughout the creation cycle.</p>
            </div>

            <div className="glass-card p-10 space-y-6 group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Globe className="text-primary w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold">Legacy Proof</h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-light">Every creation is digitally logged, preserving the history and authenticity of your bespoke masterpiece.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 px-6 relative">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 font-[family-name:var(--font-playfair)]">Sync with Excellence</h2>
          <p className="text-muted-foreground mb-12 max-w-xl mx-auto font-light">Become part of the most exclusive ecosystem for handmade luxury.</p>
          <Link href="/register">
            <Button size="lg" className="btn-premium px-16">Get Started</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
