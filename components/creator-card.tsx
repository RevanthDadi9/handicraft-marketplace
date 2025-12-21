import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Star } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export function CreatorCard({ profile }: { profile: any }) {
    return (
        <Link href={`/creators/${profile.userId}`} className="block card-3d group">
            <Card className="card-3d-content glass-card overflow-hidden border-none transition-transform duration-500">
                <CardContent className="p-0">
                    <div className="relative h-32 bg-gradient-to-br from-primary/20 to-secondary flex items-center justify-center">
                        <Avatar className="w-24 h-24 border-4 border-background translate-y-12">
                            <AvatarImage src={profile.avatarUrl || ""} alt={profile.fullName} />
                            <AvatarFallback className="bg-muted text-xl">{profile.fullName?.charAt(0)}</AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="pt-16 pb-6 px-6 text-center">
                        <h3 className="text-xl font-bold text-gradient mb-1">{profile.fullName}</h3>
                        <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-4">
                            <MapPin size={12} />
                            <span>{(profile.location as any)?.address || "Unknown"}</span>
                            <span className="mx-2">•</span>
                            <Star size={12} className="text-primary fill-primary" />
                            <span>{Number(profile.rating || 0).toFixed(1)} ({profile.reviewCount || 0})</span>
                        </div>

                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 italic px-2">
                            "{profile.bio || "Crafting premium handmade experiences."}"
                        </p>

                        <div className="flex flex-wrap justify-center gap-2">
                            {(profile.skills || []).slice(0, 3).map((skill: string) => (
                                <Badge key={skill} variant="secondary" className="bg-white/5 border-white/10 hover:bg-primary/20 hover:text-primary transition-colors">
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
