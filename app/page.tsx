import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Scissors, Palette, Sparkles, Layers, ShieldCheck, Zap, Globe } from "lucide-react";

export default async function Home() {
  const session = await auth();

  return (
    <div className="relative">
      {/* Refined Hero Section */}
      <section className="relative pt-32 pb-40 px-6">
        <div className="container mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/[0.08] mb-10">
            <Sparkles size={12} className="text-primary" />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/50">The Future of Craft</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight mb-10 leading-[1.1] font-[family-name:var(--font-playfair)]">
            Elevating the <br />
            <span className="text-gold-gradient italic">Art of Handmade</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-14 leading-relaxed font-light">
            A curated collective of elite artisans. Discover bespoke services
            and handcrafted excellence tailored to your unique vision.
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

      {/* Professional Feature Grid */}
      <section className="py-32 px-6 border-y border-white/[0.05] bg-white/[0.01]">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-[family-name:var(--font-playfair)]">The Artisan Standard</h2>
            <p className="text-muted-foreground text-sm max-w-lg mx-auto font-light">We bridge the gap between traditional mastery and modern convenience.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <ShieldCheck className="text-primary w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold">Verified Excellence</h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-light">Every creator is hand-vetted for quality, reliability, and technical mastery.</p>
            </div>

            <div className="space-y-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Zap className="text-primary w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold">Seamless Flow</h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-light">From initial request to final masterpiece, our workflow ensures clarity at every step.</p>
            </div>

            <div className="space-y-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Globe className="text-primary w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold">Global Vision</h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-light">Supporting local artisans while bringing their unique crafts to a worldwide audience.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Clean CTA Section */}
      <section className="py-40 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 font-[family-name:var(--font-playfair)]">Begin Your Legacy</h2>
          <p className="text-muted-foreground mb-12 max-w-xl mx-auto font-light">Whether you are a patron of fine craft or a master artisan, your place is here.</p>
          <Link href="/register">
            <Button size="lg" className="btn-premium px-16">Get Started</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
