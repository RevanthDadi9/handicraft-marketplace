import { notFound } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star } from "lucide-react"
import { RequestServiceModal } from "@/components/request-service-modal"
import { userService } from "@/services/user.service"
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params
    const creator = await userService.getCreatorProfile(id)
    if (!creator || !creator.profile) return { title: 'Creator Not Found' }

    return {
        title: `${creator.profile.fullName} | AuraCraft Artist`,
        description: creator.profile.bio || `View the boutique handmade portfolio of ${creator.profile.fullName}.`,
    }
}

export default async function CreatorProfilePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const creator = await userService.getCreatorProfile(id)

    if (!creator || !creator.profile) {
        notFound()
    }

    const { profile } = creator

    return (
        <div className="container mx-auto py-12 px-6">
            {/* Profile Header */}
            <Card className="glass-card border-none overflow-hidden mb-12">
                <div className="flex flex-col md:flex-row gap-10 p-10 items-start">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                        <Avatar className="h-40 w-40 relative border-4 border-background">
                            <AvatarImage src={profile.avatarUrl || ""} alt={profile.fullName} />
                            <AvatarFallback className="text-5xl font-[family-name:var(--font-playfair)]">{profile.fullName[0]}</AvatarFallback>
                        </Avatar>
                    </div>

                    <div className="flex-1 space-y-6">
                        <div>
                            <h1 className="text-5xl font-bold font-[family-name:var(--font-playfair)] text-gradient">{profile.fullName}</h1>
                            <div className="flex items-center text-primary/60 text-xs tracking-widest uppercase mt-4 font-bold">
                                <MapPin className="mr-2 h-3 w-3" />
                                {typeof profile.location === 'string' ? profile.location : (profile.location as any)?.address}
                            </div>
                        </div>

                        <p className="text-xl text-muted-foreground leading-relaxed italic max-w-3xl">"{profile.bio}"</p>

                        <div className="flex gap-3 flex-wrap">
                            {profile.skills.map((skill: string) => (
                                <Badge key={skill} variant="secondary" className="bg-white/5 border-white/10 hover:bg-primary/20 hover:text-primary transition-colors py-1.5 px-4 rounded-full">
                                    {skill}
                                </Badge>
                            ))}
                        </div>

                        <div className="flex items-center gap-8 py-4 border-y border-white/5">
                            <div className="flex items-center gap-2">
                                <Star className="text-primary fill-primary h-5 w-5" />
                                <span className="text-2xl font-bold">{Number(profile.rating).toFixed(1)}</span>
                                <span className="text-xs text-muted-foreground tracking-widest uppercase">({profile.reviewCount} Reviews)</span>
                            </div>
                            <div className="h-8 w-px bg-white/5" />
                            <div>
                                <span className="text-2xl font-bold text-gradient">
                                    {profile.hourlyRate ? `$${profile.hourlyRate}` : 'Contact'}
                                </span>
                                <span className="text-[10px] text-muted-foreground tracking-widest uppercase ml-2">/ Hour</span>
                            </div>
                        </div>

                        <div className="flex gap-6 pt-2">
                            <RequestServiceModal creatorId={creator.id} creatorName={profile.fullName} />
                            <Button variant="outline" size="lg" className="rounded-full px-10 border-white/10 hover:bg-white/5">Send Inquiry</Button>
                        </div>
                    </div>
                </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Portfolio Grid */}
                <div className="lg:col-span-2 space-y-8">
                    <h2 className="text-2xl font-bold font-[family-name:var(--font-playfair)] flex items-center gap-4">
                        Masterpieces
                        <div className="h-px flex-1 bg-white/5" />
                    </h2>
                    {profile.portfolio.length === 0 ? (
                        <div className="glass-card p-12 text-center italic text-muted-foreground">
                            The gallery is currently being curated. Check back soon.
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-6">
                            {profile.portfolio.map((img: string, idx: number) => (
                                <div key={idx} className="aspect-[4/3] glass-card rounded-2xl overflow-hidden relative group">
                                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                                    <img src={img} alt="Portfolio item" className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700" />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Reviews Section */}
                <div className="space-y-8">
                    <h2 className="text-2xl font-bold font-[family-name:var(--font-playfair)] flex items-center gap-4">
                        Legacy
                        <div className="h-px flex-1 bg-white/5" />
                    </h2>
                    <div className="space-y-6">
                        {creator.receivedOrders.map((order: any) => order.review).filter(Boolean).map((review: any) => (
                            <Card key={review.id} className="glass-card border-none">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex text-primary">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <Star key={i} className={`h-3 w-3 ${i < review.rating ? "fill-current" : "opacity-20"}`} />
                                            ))}
                                        </div>
                                        <span className="text-[10px] font-bold tracking-widest uppercase text-white/40">
                                            {review.author?.profile?.fullName || "Verified Patron"}
                                        </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground leading-relaxed italic">"{review.comment}"</p>
                                </CardContent>
                            </Card>
                        ))}
                        {creator.receivedOrders.filter((o: any) => o.review).length === 0 && (
                            <div className="glass-card p-8 text-center text-sm italic text-muted-foreground">No endorsements yet.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
