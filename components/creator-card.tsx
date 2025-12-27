import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Star } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export function CreatorCard({ profile }: { profile: any }) {
    return (
        <Link href={`/creators/${profile.userId}`} className="block group">
            <Card className="glass-card overflow-hidden border-none transition-all duration-500 hover:-translate-y-1">
                <CardContent className="p-0">
                    <div className="relative h-24 bg-secondary">
                        <Avatar className="w-20 h-20 border-4 border-background absolute -bottom-10 left-6 z-10">
                            <AvatarImage src={profile.avatarUrl || ""} alt={profile.fullName} />
                            <AvatarFallback className="bg-muted text-lg font-medium">{profile.fullName?.charAt(0)}</AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="pt-14 pb-8 px-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">{profile.fullName}</h3>
                                <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground uppercase tracking-widest">
                                    <MapPin size={10} />
                                    <span>{(profile.location as any)?.address || "Unknown"}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 bg-white/[0.03] px-2 py-1 rounded-lg border border-white/[0.05]">
                                <Star size={10} className="text-primary fill-primary" />
                                <span className="text-[10px] font-bold">{Number(profile.rating || 0).toFixed(1)}</span>
                            </div>
                        </div>

                        <p className="text-sm text-muted-foreground line-clamp-2 mb-6 font-light italic">
                            {profile.bio || "Crafting premium handmade experiences."}
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {(profile.skills || []).slice(0, 3).map((skill: string) => (
                                <Badge key={skill} variant="secondary" className="bg-white/5 border-white/5 text-[9px] uppercase tracking-wider h-6 hover:bg-primary/10 hover:text-primary transition-colors">
                                    {skill}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}
