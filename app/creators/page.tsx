import { CreatorCard } from "@/components/creator-card"
import { userService } from "@/services/user.service"

export const dynamic = 'force-dynamic'

export default async function CreatorsPage() {
    const creators = await userService.getAllCreators()
    const profiles = creators.map(u => u.profile).filter(Boolean)

    return (
        <div className="container mx-auto py-12 px-6">
            <div className="mb-12 text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 font-[family-name:var(--font-playfair)] text-gradient">
                    Find Extraordinary Artists
                </h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto italic">
                    Connect with specialized creators in stitching, embroidery, and design.
                </p>
            </div>

            {profiles.length === 0 ? (
                <div className="glass-card text-center py-20">
                    <p className="text-muted-foreground text-xl">The workshop is currently quiet. Check back soon for new artists.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {profiles.map((profile: any) => (
                        <CreatorCard key={profile.id} profile={profile} />
                    ))}
                </div>
            )}
        </div>
    )
}
