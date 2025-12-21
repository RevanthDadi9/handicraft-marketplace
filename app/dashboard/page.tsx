import { auth } from "@/auth"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { redirect } from "next/navigation"
import Link from "next/link"
import { orderService } from "@/services/order.service"
import { userRepo } from "@/data/user-repo"

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
    const session = await auth()

    if (!session?.user?.id) {
        redirect("/api/auth/signin")
    }

    const user = await userRepo.findById(session.user.id)
    if (!user) redirect("/")

    const orders = await orderService.getUserOrders(user.id)

    return (
        <div className="container mx-auto py-12 px-6">
            <h1 className="text-4xl font-bold mb-6 text-gradient font-[family-name:var(--font-playfair)]">Dashboard</h1>

            {user.role === "CREATOR" && user.status === "PENDING_APPROVAL" && (
                <div className="mb-10 p-6 glass-card border-yellow-500/20 bg-yellow-500/5 rounded-2xl flex items-center justify-between">
                    <div className="space-y-1">
                        <h3 className="text-yellow-500 font-bold tracking-tight">Vetting in Progress</h3>
                        <p className="text-xs text-yellow-500/60 italic">Our Elders are reviewing your portfolio. You will be notified once consecrated as an Active Artisan.</p>
                    </div>
                    <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30 text-[10px] uppercase h-6">Awaiting Review</Badge>
                </div>
            )}

            <div className="space-y-8">
                <h2 className="text-xl font-semibold tracking-tight text-white/50 border-b border-white/5 pb-2">
                    {user.role === "CREATOR" ? "ACTIVE REQUESTS" : "YOUR COLLECTIONS"}
                </h2>

                {orders.length === 0 ? (
                    <div className="glass-card p-12 text-center">
                        <p className="text-muted-foreground text-lg italic">The threads are quiet. No orders in your loom yet.</p>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {orders.map((order: any) => (
                            <Link href={`/orders/${order.id}`} key={order.id} className="block group">
                                <Card className="glass-card overflow-hidden border-white/5 transition-all duration-300">
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{order.title}</h3>
                                                <p className="text-sm text-muted-foreground mt-1 underline decoration-primary/20">
                                                    {user.role === "CREATOR"
                                                        ? `Patron: ${order.customer.profile?.fullName || order.customer.email}`
                                                        : `Artisan: ${order.creator.profile?.fullName}`}
                                                </p>
                                            </div>
                                            <Badge variant="secondary" className="bg-white/5 border-white/10 text-[10px] tracking-widest uppercase">
                                                {order.status}
                                            </Badge>
                                        </div>
                                        <div className="flex justify-between items-end">
                                            <p className="text-sm text-muted-foreground line-clamp-2 max-w-xl italic">
                                                "{order.description}"
                                            </p>
                                            <div className="text-2xl font-bold text-gradient">
                                                ${Number(order.budget)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Card>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
