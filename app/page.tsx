import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, Zap, Globe } from "lucide-react";

export default async function Home() {
  const session = await auth();

  return (
    <div className="relative overflow-hidden">
      {/* Living Workshop Background Elements */}
      {/* Living Workshop: Cinematic Symphony of Craft */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden mask-radial-edges">
        {/* === LAYER 1: Distant Background (Deep Blur, Low Opacity) === */}
        <div
          className="absolute top-[5%] left-[15%] w-96 h-96 animate-artisan-float"
          style={{ '--duration': '22s', '--rotation': '-15deg', '--opacity': '0.04', '--blur-min': '4px', '--blur-max': '8px' } as any}
        >
          <img src="/creator-pottery.png" alt="Pottery Background" className="w-full h-full object-cover rounded-full" />
        </div>

        <div
          className="absolute top-[40%] right-[-10%] w-[32rem] h-[32rem] animate-artisan-float"
          style={{ '--duration': '25s', '--rotation': '20deg', '--opacity': '0.03', '--blur-min': '6px', '--blur-max': '12px', '--delay': '2s' } as any}
        >
          <img src="/creator-weaving.png" alt="Weaving Background" className="w-full h-full object-cover rounded-[10rem]" />
        </div>

        {/* === LAYER 2: Mid-Ground (Soft Focus, Contextual) === */}
        <div
          className="absolute top-[15%] right-[5%] w-64 h-64 md:w-[26rem] md:h-[26rem] animate-artisan-float"
          style={{ '--duration': '16s', '--rotation': '-8deg', '--opacity': '0.08', '--blur-min': '2px', '--blur-max': '4px', '--delay': '1s' } as any}
        >
          <img src="/creator-embroidery.png" alt="Embroidery Mid" className="w-full h-full object-cover rounded-[4rem] shadow-2xl" />
        </div>

        <div
          className="absolute bottom-[10%] left-[-5%] w-64 h-64 md:w-[24rem] md:h-[24rem] animate-artisan-float"
          style={{ '--duration': '14s', '--rotation': '12deg', '--opacity': '0.07', '--blur-min': '1px', '--blur-max': '3px', '--delay': '4s' } as any}
        >
          <img src="/creator-pottery.png" alt="Pottery Mid" className="w-full h-full object-cover rounded-3xl shadow-xl" />
        </div>

        {/* === LAYER 3: Foreground (Sharp Focus, Detailing) === */}
        <div
          className="absolute bottom-[20%] right-[10%] w-48 h-48 md:w-[20rem] md:h-[20rem] animate-artisan-float"
          style={{ '--duration': '12s', '--rotation': '-5deg', '--opacity': '0.1', '--blur-min': '0px', '--blur-max': '1px', '--delay': '3s' } as any}
        >
          <img src="/creator-weaving.png" alt="Weaving Foreground" className="w-full h-full object-cover rounded-2xl shadow-2xl border border-white/5" />
        </div>

        {/* Central Macro Detail Shot */}
        <div
          className="absolute top-[60%] left-[20%] w-32 h-32 md:w-56 md:h-56 animate-artisan-float"
          style={{ '--duration': '10s', '--rotation': '5deg', '--opacity': '0.09', '--blur-min': '0px', '--blur-max': '1px', '--delay': '5s' } as any}
        >
          <img src="/creator-embroidery.png" alt="Embroidery Detail" className="w-full h-full object-cover rounded-full border-2 border-primary/20 p-2 shadow-inner shadow-primary/10" />
        </div>

        {/* Dynamic Light Rays (The 'Sync' Lines) */}
        <div className="absolute top-0 left-[35%] w-[1px] h-full bg-gradient-to-b from-transparent via-primary/15 to-transparent -rotate-12 blur-[1px] animate-pulse"></div>
        <div className="absolute top-0 right-[35%] w-[1px] h-full bg-gradient-to-b from-transparent via-primary/10 to-transparent rotate-12 blur-[2px] animate-pulse"></div>
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
