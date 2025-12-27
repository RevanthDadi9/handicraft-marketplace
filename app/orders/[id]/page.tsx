import { auth } from "@/auth"
import { notFound, redirect } from "next/navigation"
import { ChatBox } from "@/components/chat-box"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { updateOrderStatus } from "@/app/actions-order"
import { PaymentModal } from "@/components/payment-modal"
import { ReviewForm } from "@/components/review-form"
import { format } from "date-fns"
import { orderService } from "@/services/order.service"
import { OrderStatusStepper } from "@/components/order-status-stepper"

export const dynamic = 'force-dynamic'

export default async function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const session = await auth()
    if (!session?.user?.id) redirect("/api/auth/signin")

    const order = await orderService.getOrderDetails(id, session.user.id)

    const isCreator = session.user.id === order.creatorId

    async function updateStatus(status: "REQUESTED" | "ACCEPTED" | "IN_PROGRESS" | "READY" | "DELIVERED" | "COMPLETED" | "CANCELLED") {
        "use server"
        await updateOrderStatus(order.id, status)
    }

    return (
        <div className="container mx-auto py-12 px-6">
            <div className="mb-12">
                <h1 className="text-4xl font-bold mb-8 text-gradient font-[family-name:var(--font-playfair)]">Process Status</h1>
                <OrderStatusStepper currentStatus={order.status} />
            </div>

            <div className="flex flex-col lg:flex-row gap-10">
                {/* Left: Order Info & Actions */}
                <div className="flex-1 space-y-8">
                    <Card className="glass-card border-none overflow-hidden">
                        <CardHeader className="border-b border-white/5 pb-8">
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-3xl font-bold">{order.title}</CardTitle>
                                    <CardDescription className="text-xs uppercase tracking-widest mt-2 text-primary/60">Reference: {order.id.substring(0, 8)}</CardDescription>
                                </div>
                                <Badge className="bg-primary/20 text-primary border-primary/30 text-[10px] tracking-widest uppercase py-1">
                                    {order.status}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-8 pt-8">
                            <div className="bg-white/5 border border-white/5 p-6 rounded-2xl italic text-muted-foreground leading-relaxed">
                                "{order.description}"
                            </div>

                            {order.referenceImages && order.referenceImages.length > 0 && (
                                <div className="space-y-4">
                                    <h3 className="text-xs font-bold tracking-widest uppercase text-white/40">Visual Vision</h3>
                                    <div className="flex flex-wrap gap-4">
                                        {order.referenceImages.map((url: string, i: number) => (
                                            <a key={i} href={url} target="_blank" rel="noreferrer" className="block relative group">
                                                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                                                <img src={url} alt={`ref-${i}`} className="w-24 h-24 object-cover rounded-xl border border-white/10" />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                <div>
                                    <h3 className="text-[10px] font-bold tracking-widest uppercase text-white/40 mb-1">Honorarium</h3>
                                    <p className="text-2xl font-bold text-gradient">${Number(order.budget)}</p>
                                </div>
                                <div>
                                    <h3 className="text-[10px] font-bold tracking-widest uppercase text-white/40 mb-1">Timeline</h3>
                                    <p className="text-sm font-medium">
                                        {order.deadline ? format(new Date(order.deadline), "PPP") : "Open-ended"}
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-[10px] font-bold tracking-widest uppercase text-white/40 mb-1">Patron</h3>
                                    <p className="text-sm font-medium">{order.customer.profile?.fullName || order.customer.email}</p>
                                </div>
                                <div>
                                    <h3 className="text-[10px] font-bold tracking-widest uppercase text-white/40 mb-1">Artisan</h3>
                                    <p className="text-sm font-medium">{order.creator.profile?.fullName}</p>
                                </div>
                            </div>

                            {!isCreator && order.status === 'COMPLETED' && !order.review && (
                                <div className="w-full mt-4 glass p-6 rounded-2xl">
                                    <ReviewForm orderId={order.id} />
                                </div>
                            )}

                            <div className="pt-8 border-t border-white/5 flex gap-4 flex-wrap">
                                {isCreator && order.status === 'REQUESTED' && (
                                    <>
                                        <form action={updateStatus.bind(null, "ACCEPTED")}>
                                            <Button type="submit" className="rounded-full px-8 bg-primary hover:bg-primary/80 text-black font-bold h-12">Incept Order</Button>
                                        </form>
                                        <form action={updateStatus.bind(null, "CANCELLED")}>
                                            <Button type="submit" variant="ghost" className="rounded-full px-8 border border-white/10 h-12">Archive Request</Button>
                                        </form>
                                    </>
                                )}

                                {!isCreator && order.status === 'ACCEPTED' && (
                                    <div className="flex flex-col gap-4">
                                        <p className="text-xs italic text-yellow-500/80">Order accepted. Awaiting payment to start...</p>
                                        <PaymentModal orderId={order.id} amount={Number(order.budget)} />
                                    </div>
                                )}

                                {isCreator && order.status === 'ACCEPTED' && (
                                    <form action={updateStatus.bind(null, "IN_PROGRESS")}>
                                        <Button type="submit" className="rounded-full px-8 h-12 bg-primary hover:bg-primary/80 text-black font-bold shadow-[0_0_20px_rgba(255,215,0,0.2)] transition-all transform hover:scale-105">Begin Craftsmanship</Button>
                                    </form>
                                )}

                                {isCreator && order.status === 'IN_PROGRESS' && (
                                    <form action={updateStatus.bind(null, "READY")}>
                                        <Button type="submit" className="rounded-full px-8 h-12 bg-primary text-black font-bold">Mark as Ready</Button>
                                    </form>
                                )}

                                {isCreator && order.status === 'READY' && (
                                    <form action={updateStatus.bind(null, "DELIVERED")}>
                                        <Button type="submit" className="rounded-full px-8 h-12 bg-accent text-white font-bold">Signal Delivery</Button>
                                    </form>
                                )}

                                {!isCreator && order.status === 'DELIVERED' && (
                                    <form action={updateStatus.bind(null, "COMPLETED")}>
                                        <Button type="submit" className="rounded-full px-12 h-14 bg-green-500 hover:bg-green-600 text-black font-bold shadow-[0_0_20px_rgba(34,197,94,0.3)] cursor-pointer">Validate & Finalize Legacy</Button>
                                    </form>
                                )}

                                {isCreator && order.status === 'DELIVERED' && (
                                    <div className="flex items-center gap-3 px-6 py-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-500">
                                        <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                                        <span className="text-sm font-bold tracking-wide uppercase">Awaiting Patron Confirmation</span>
                                    </div>
                                )}

                                {order.status === 'COMPLETED' && (
                                    <div className="flex items-center gap-2 text-primary font-bold tracking-tight">
                                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                        Legacy Crafted Successfully
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right: Correspondence */}
                <div className="lg:w-[450px]">
                    <h3 className="text-xs font-bold tracking-widest uppercase text-white/40 mb-6 px-2">Correspondence</h3>
                    <div className="glass-card h-[600px] flex flex-col overflow-hidden">
                        <ChatBox orderId={order.id} currentUserId={session.user.id} />
                    </div>
                </div>
            </div>
        </div>
    )
}
