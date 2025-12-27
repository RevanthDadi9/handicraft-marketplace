import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { orderService } from "@/services/order.service"
import { userRepo } from "@/data/user-repo"
import { DashboardClient } from "@/components/dashboard-client"

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
    const session = await auth()

    if (!session?.user?.id) {
        redirect("/login")
    }

    const user = await userRepo.findByIdWithProfileAndReviews(session.user.id)
    if (!user) redirect("/")

    const orders = await orderService.getUserOrders(user.id)

    // Serialize data to avoid "Decimal objects not supported" error
    const plainUser = JSON.parse(JSON.stringify(user))
    const plainOrders = JSON.parse(JSON.stringify(orders))

    return <DashboardClient user={plainUser} orders={plainOrders} />
}
