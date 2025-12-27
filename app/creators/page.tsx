import { CreatorCard } from "@/components/creator-card"
import { userService } from "@/services/user.service"

export const dynamic = 'force-dynamic'

export default async function CreatorsPage() {
    const creators = await userService.getAllCreators()
    const pendingCreators = await userService.getPendingCreators() // Fetch pending as well
    const profiles = creators.map(u => u.profile).filter(Boolean)
    const pendingProfiles = pendingCreators.map(u => u.profile).filter(Boolean)

    return (
        <div className="container mx-auto py-20 px-6">
            <div className="mb-20">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 font-[family-name:var(--font-playfair)]">
                    Extraordinary Artisans
                </h1>
                <p className="text-muted-foreground text-sm max-w-xl font-light">
                    A curated selection of master creators specializing in traditional craftsmanship and modern design.
                </p>
            </div>

            {profiles.length === 0 && pendingProfiles.length === 0 ? (
                <div className="glass-card text-center py-32 border-dashed border-white/[0.05]">
                    <p className="text-muted-foreground font-light italic">The workshop is currently quiet. Check back soon for new artists.</p>
                </div>
            ) : (
                <div className="space-y-20">
                    {profiles.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {profiles.map((profile: any) => (
                                <CreatorCard key={profile.id} profile={profile} />
                            ))}
                        </div>
                    )}

                    {pendingProfiles.length > 0 && (
                        <div className="opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                            <div className="flex items-center gap-4 mb-8">
                                <h2 className="text-2xl font-bold font-[family-name:var(--font-playfair)] text-white/40">Coming Soon</h2>
                                <div className="h-px bg-white/10 flex-1" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {pendingProfiles.map((profile: any) => (
                                    <div key={profile.id} className="relative group">
                                        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-[1px]">
                                            <span className="bg-black/80 text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-white/10">Verification Pending</span>
                                        </div>
                                        <CreatorCard profile={profile} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
