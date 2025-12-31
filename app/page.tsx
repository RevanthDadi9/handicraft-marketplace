import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, Zap, Globe, Scissors, Palette, Heart } from "lucide-react";

export default async function Home() {
  const session = await auth();

  return (
    <div className="relative min-h-screen bg-background selection:bg-primary/20">
      {/* Refined Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden border-b border-white/[0.05]">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/[0.1] mb-8 shadow-2xl animate-reveal">
              <Sparkles size={12} className="text-primary animate-glow" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/70">The New Era of Handcraft</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight mb-8 leading-[1.2] pb-2 font-[family-name:var(--font-playfair)] animate-reveal reveal-delay-1 bg-gradient-to-b from-white via-white to-white/70 bg-clip-text text-transparent">
              Where Every <br />
              <span className="text-gold-gradient italic pr-2">Thread Details</span> <br />
              A Legacy.
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground/80 max-w-lg mb-12 leading-relaxed font-light animate-reveal reveal-delay-2">
              Connect with the most skilled artisans globally. A managed marketplace for those who value authenticity over mass production.
            </p>

            <div className="flex flex-wrap gap-6 items-center animate-reveal reveal-delay-3">
              <Link href="/creators">
                <Button size="lg" className="btn-premium px-10 h-14 text-base">
                  Explore The Collective <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              {!session && (
                <Link href="/register">
                  <Button variant="outline" size="lg" className="btn-secondary px-10 h-14 text-base">
                    Join as Artisan
                  </Button>
                </Link>
              )}
            </div>
          </div>

          <div className="relative animate-reveal reveal-delay-2 hidden lg:block">
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden group shadow-[0_0_100px_rgba(0,0,0,0.5)]">
              <img
                src="/creator-embroidery.png"
                alt="Master Artisan at Work"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
              <div className="absolute bottom-12 left-12 right-12">
                <div className="glass p-6 rounded-2xl border border-white/10 backdrop-blur-xl">
                  <p className="text-white/60 text-xs uppercase tracking-widest font-bold mb-2">Featured Masterpiece</p>
                  <p className="text-white text-xl font-[family-name:var(--font-playfair)]">Traditional Silk Maggam Detail</p>
                </div>
              </div>
            </div>

            {/* Minimal Decorative Elements */}
            <div className="absolute -top-8 -right-8 w-48 h-48 bg-primary/20 blur-[100px] -z-10 rounded-full animate-glow"></div>
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-primary/10 blur-[120px] -z-10 rounded-full animate-glow"></div>
          </div>
        </div>
      </section>

      {/* The Boutique Collection */}
      <section className="py-32 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
            <div className="animate-reveal">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 font-[family-name:var(--font-playfair)]">Artistry in Sync</h2>
              <p className="text-muted-foreground text-lg max-w-xl font-light">From the rhythmic loom of weavers to the delicate touch of embroiderers, witness the synchronization of talent.</p>
            </div>
            <Link href="/creators" className="text-primary font-bold uppercase tracking-widest text-xs hover:opacity-80 transition-opacity">
              View All Specialties →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group animate-reveal reveal-delay-1">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden mb-6 relative">
                <img src="/creator-pottery.png" alt="Pottery" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-6 right-6 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Heart size={16} className="text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Ceramic Mastery</h3>
              <p className="text-sm text-muted-foreground font-light">Traditional wheel-spun pottery with contemporary glazes.</p>
            </div>

            <div className="group animate-reveal reveal-delay-2">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden mb-6 relative">
                <img src="/creator-weaving.png" alt="Weaving" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-6 right-6 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Heart size={16} className="text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Heritage Weaving</h3>
              <p className="text-sm text-muted-foreground font-light">Intricate patterns woven on restored vintage handlooms.</p>
            </div>

            <div className="group animate-reveal reveal-delay-3">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden mb-6 relative border border-white/5 bg-white/5 flex items-center justify-center">
                <div className="text-center p-8">
                  <Palette className="w-12 h-12 text-primary mx-auto mb-4" />
                  <p className="text-sm text-white/50">Coming Soon</p>
                  <p className="text-lg font-medium">Bespoke Tailoring</p>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Digital Studio</h3>
              <p className="text-sm text-muted-foreground font-light">Customize every stitch through our synchronization tools.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 bg-secondary/30 border-y border-white/[0.05]">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { icon: ShieldCheck, title: "Verified Trust", desc: "Council-vetted artisans for unmatched quality." },
              { icon: Zap, title: "Direct Sync", desc: "Real-time communication with the masters." },
              { icon: Globe, title: "Global Reach", desc: "Bridging traditional crafts with global patrons." },
              { icon: Scissors, title: "Tailored Focus", desc: "Bespoke services adjusted to your unique vision." }
            ].map((item, idx) => (
              <div key={idx} className="space-y-4 animate-reveal" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <item.icon className="text-primary w-6 h-6" />
                </div>
                <h4 className="text-lg font-semibold">{item.title}</h4>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-40 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10 animate-reveal">
          <h2 className="text-5xl md:text-7xl font-bold mb-10 font-[family-name:var(--font-playfair)]">Begin Your Legacy</h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-xl mx-auto font-light">Whether you are a patron of fine craft or a master artisan, your place is in the sync.</p>
          <Link href="/register">
            <Button size="lg" className="btn-premium px-16 h-16 text-lg">Initialize Collaboration</Button>
          </Link>
        </div>

        {/* Abstract Background Decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full -z-10 animate-glow"></div>
      </section>
      {/* Footer */}
      <footer className="relative py-12 border-t border-white/[0.05] bg-black/40">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <span className="text-xl font-bold tracking-[0.2em] font-[family-name:var(--font-playfair)] mb-4 block">
                KALASYNC
              </span>
              <p className="text-muted-foreground font-light max-w-sm">
                Empowering artisans, preserving heritage, and synchronizing the world with authenticity.
              </p>
            </div>
            <div>
              <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-white/50">Platform</h4>
              <ul className="space-y-4 text-sm font-light text-muted-foreground">
                <li><Link href="/creators" className="hover:text-primary transition-colors">Artisans</Link></li>
                <li><Link href="/testimonials" className="hover:text-primary transition-colors">Community Stories</Link></li>
                <li><Link href="/register" className="hover:text-primary transition-colors">Join the Sync</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-white/50">Support</h4>
              <ul className="space-y-4 text-sm font-light text-muted-foreground">
                <li><Link href="/support" className="hover:text-primary transition-colors">Help Center</Link></li>
                <li><a href="mailto:creatorsauras@gmail.com" className="hover:text-primary transition-colors">creatorsauras@gmail.com</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/[0.05] flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground font-light">
              &copy; {new Date().getFullYear()} KalaSync. All Rights Reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-xs text-muted-foreground hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-xs text-muted-foreground hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
