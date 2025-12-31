import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";

export default function SupportPage() {
    return (
        <div className="min-h-screen pt-24 pb-20 container mx-auto px-6">
            <div className="max-w-4xl mx-auto animate-reveal">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 font-[family-name:var(--font-playfair)] text-center">
                    How Can We <span className="text-gold-gradient italic">Assign</span> You?
                </h1>
                <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
                    Whether you have a question about an order, need technical assistance, or want to provide feedback, our Council is here to help.
                </p>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="glass p-8 rounded-2xl border border-white/10">
                            <h3 className="text-lg font-semibold mb-6">Direct Channels</h3>
                            <ul className="space-y-6">
                                <li className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                        <Mail size={18} className="text-primary" />
                                    </div>
                                    <div>
                                        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-1">Email Support</span>
                                        <a href="mailto:creatorsauras@gmail.com" className="text-lg hover:text-primary transition-colors">creatorsauras@gmail.com</a>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                        <Phone size={18} className="text-primary" />
                                    </div>
                                    <div>
                                        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-1">Urgent Inquiry</span>
                                        <p className="text-lg">+91 (800) 123-4567</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="glass p-8 rounded-2xl border border-white/10">
                            <h3 className="text-lg font-semibold mb-4">FAQ</h3>
                            <div className="space-y-4">
                                <details className="group">
                                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-sm group-hover:text-primary transition-colors">
                                        <span>How do I utilize the Sync feature?</span>
                                        <span className="transition group-open:rotate-180">
                                            <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                        </span>
                                    </summary>
                                    <p className="text-muted-foreground mt-3 text-sm leading-relaxed group-open:animate-reveal">
                                        Sync allows you to communicate directly with artisans in real-time. Simply navigate to your active order and use the message panel.
                                    </p>
                                </details>
                                <div className="h-[1px] bg-white/5"></div>
                                <details className="group">
                                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-sm group-hover:text-primary transition-colors">
                                        <span>Are transactions secure?</span>
                                        <span className="transition group-open:rotate-180">
                                            <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                        </span>
                                    </summary>
                                    <p className="text-muted-foreground mt-3 text-sm leading-relaxed group-open:animate-reveal">
                                        Yes. All payments are held in escrow by the Council (Admin) until you confirm the milestone or delivery is verified.
                                    </p>
                                </details>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="glass p-8 rounded-3xl border border-white/10">
                        <h3 className="text-xl font-semibold mb-6">Send a Message</h3>
                        <form className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">First Name</label>
                                    <Input placeholder="Jane" className="bg-white/5 border-white/10 focus:border-primary/50" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Last Name</label>
                                    <Input placeholder="Doe" className="bg-white/5 border-white/10 focus:border-primary/50" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email Address</label>
                                <Input type="email" placeholder="jane@example.com" className="bg-white/5 border-white/10 focus:border-primary/50" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Subject</label>
                                <Input placeholder="Order Inquiry..." className="bg-white/5 border-white/10 focus:border-primary/50" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Message</label>
                                <Textarea placeholder="Tell us how we can help..." className="min-h-[150px] bg-white/5 border-white/10 focus:border-primary/50 resize-none" />
                            </div>

                            <Button className="w-full btn-premium">Send Message</Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
