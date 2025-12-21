import { orderRepo } from "@/data/order-repo"
import { OrderStatus } from "@prisma/client"

export class OrderService {
    async createDirectOrder(
        customerId: string,
        data: {
            creatorId: string
            title: string
            description: string
            budget: number
            deadline?: Date | null
            referenceImages?: string[]
        }
    ) {
        // Business Logic: Validate customer != creator
        if (customerId === data.creatorId) {
            throw new Error("Cannot create order for yourself")
        }

        const order = await orderRepo.create({
            customerId,
            ...data,
            status: "REQUESTED"
        })

        // PRODUCTION NOTE: Trigger Notifications here (Resend/Twilio)
        console.log(`[NOTIFICATION] Email sent to Creator ${data.creatorId}: New Order Request received.`)
        console.log(`[NOTIFICATION] SMS sent to Creator ${data.creatorId}: You have a new handmade order request!`)

        return order
    }

    async updateStatus(orderId: string, status: OrderStatus, userId: string) {
        const order = await orderRepo.findById(orderId)
        if (!order) throw new Error("Order not found")

        const isCustomer = order.customerId === userId
        const isCreator = order.creatorId === userId
        const current = order.status

        // Managed State Machine: No skipping, No manual hacks
        const allowed = {
            CREATED: { next: ["REQUESTED"], actor: "CUSTOMER" },
            REQUESTED: { next: ["ACCEPTED", "CANCELLED"], actor: "CREATOR" },
            ACCEPTED: { next: ["IN_PROGRESS", "CANCELLED"], actor: "CREATOR" },
            IN_PROGRESS: { next: ["READY"], actor: "CREATOR" },
            READY: { next: ["DELIVERED"], actor: "CREATOR" },
            DELIVERED: { next: ["COMPLETED"], actor: "CUSTOMER" },
            COMPLETED: { next: [], actor: "NONE" },
            CANCELLED: { next: [], actor: "NONE" }
        }

        const transition = (allowed as any)[current]
        if (!transition.next.includes(status)) {
            throw new Error(`Invalid transition: ${current} -> ${status}`)
        }

        const requiredActor = (allowed as any)[current].actor
        if (requiredActor === "CUSTOMER" && !isCustomer) throw new Error("Only customer can trigger this")
        if (requiredActor === "CREATOR" && !isCreator) throw new Error("Only creator can trigger this")

        const updatedOrder = await orderRepo.updateStatus(orderId, status)

        // NON-NEGOTIABLE: Trigger Notifications (Placeholder for Resend/Twilio)
        console.log(`[MANAGED FLOW] Order ${orderId}: ${current} -> ${status}. Triggering Email/SMS.`)

        return updatedOrder
    }

    async getOrderDetails(orderId: string, userId: string) {
        const order = await orderRepo.findByIdWithDetails(orderId)
        if (!order) throw new Error("Order not found")
        if (order.customerId !== userId && order.creatorId !== userId) {
            throw new Error("Unauthorized")
        }
        return order
    }

    async getUserOrders(userId: string) {
        return orderRepo.findByUserId(userId)
    }
}

export const orderService = new OrderService()
