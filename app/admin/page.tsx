import { userService } from "@/services/user.service"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { approveCreator } from "@/app/actions"
import { Badge } from "@/components/ui/badge"
import { Image as ImageIcon, CheckCircle, XCircle } from "lucide-react"

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
    const session = await auth()

    // In production, check role: if (session?.user?.role !== 'ADMIN') redirect('/')
    // For now, allow access if logged in for testing, or add a simple check
    if (!session?.user) redirect("/api/auth/signin")
    if ((session.user as any).role !== 'ADMIN') redirect("/")

    const pendingCreators = await userService.getPendingCreators()

    return (
        <div className="container mx-auto py-12 px-6">
            <div className="mb-10">
                <h1 className="text-4xl font-bold text-gradient font-[family-name:var(--font-playfair)] mb-2">Elders' Council</h1>
                <p className="text-muted-foreground italic">Review and consecrate new artisans to the collective.</p>
            </div>

            {pendingCreators.length === 0 ? (
                <Card className="glass-card border-dashed border-white/10 text-center py-20">
                    <div className="flex flex-col items-center gap-4">
                        <CheckCircle className="w-12 h-12 text-primary opacity-20" />
                        <CardTitle className="text-white/40">No souls awaiting review.</CardTitle>
                    </div>
                </Card>
            ) : (
                <div className="grid gap-8">
                    {pendingCreators.map((creator) => (
                        <Card key={creator.id} className="glass-card border-none overflow-hidden">
                            <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 bg-white/[0.02]">
                                <div>
                                    <CardTitle className="text-2xl text-gradient">{creator.profile?.fullName}</CardTitle>
                                    <CardDescription>{creator.email} • {creator.profile?.location as any ? (creator.profile?.location as any).address : "No location"}</CardDescription>
                                </div>
                                <div className="flex gap-4">
                                    <form action={async () => {
                                        "use server"
                                        await approveCreator(creator.id)
                                    }}>
                                        <Button type="submit" className="bg-primary hover:bg-primary/80 text-black font-bold px-8 rounded-full shadow-[0_0_20px_rgba(255,215,0,0.2)]">
                                            Approve Artisan
                                        </Button>
                                    </form>
                                    <Button variant="outline" className="rounded-full border-red-500/50 text-red-500 hover:bg-red-500/10 h-10">
                                        Reject
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="p-8 space-y-8">
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <h4 className="text-[10px] font-bold tracking-widest uppercase text-white/40">Manifesto</h4>
                                        <p className="text-sm italic leading-relaxed text-muted-foreground">{creator.profile?.bio}</p>

                                        <h4 className="text-[10px] font-bold tracking-widest uppercase text-white/40 mt-6">Masteries</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {creator.profile?.skills.map(skill => (
                                                <Badge key={skill} variant="secondary" className="bg-white/5 text-[10px] uppercase tracking-wider">{skill}</Badge>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="text-[10px] font-bold tracking-widest uppercase text-white/40 mb-4 flex items-center gap-2">
                                                <ImageIcon className="w-3 h-3" /> Masterpieces (Portfolio)
                                            </h4>
                                            <div className="grid grid-cols-3 gap-2">
                                                {creator.profile?.portfolio.map((url, i) => (
                                                    <img key={i} src={url} alt="Portfolio" className="w-full aspect-square object-cover rounded-lg border border-white/5" />
                                                ))}
                                                {creator.profile?.portfolio.length === 0 && <p className="text-[10px] text-yellow-500/50 italic">No masterpieces provided.</p>}
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="text-[10px] font-bold tracking-widest uppercase text-white/40 mb-4 flex items-center gap-2">
                                                <ImageIcon className="w-3 h-3" /> The Loom (Setup/Machinery)
                                            </h4>
                                            <div className="grid grid-cols-3 gap-2">
                                                {creator.profile?.machinePhotos.map((url, i) => (
                                                    <img key={i} src={url} alt="Machine" className="w-full aspect-square object-cover rounded-lg border border-white/5" />
                                                ))}
                                                {creator.profile?.machinePhotos.length === 0 && <p className="text-[10px] text-yellow-500/50 italic">No tool photos provided.</p>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
