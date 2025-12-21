"use server"

import { z } from "zod"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"
import { orderService } from "@/services/order.service"

const orderSchema = z.object({
    creatorId: z.string(),
    title: z.string().min(5),
    description: z.string().min(10),
    budget: z.coerce.number().min(1),
    deadline: z.string().optional(), // ISO string
    referenceImages: z.array(z.string()).optional(),
})

export async function createOrder(formData: z.infer<typeof orderSchema>) {
    const session = await auth()
    if (!session?.user?.id) {
        return { error: "Unauthorized" }
    }

    const validatedFields = orderSchema.safeParse(formData)

    if (!validatedFields.success) {
        return { error: "Invalid fields" }
    }

    const { creatorId, title, description, budget, deadline, referenceImages } = validatedFields.data

    try {
        const order = await orderService.createDirectOrder(session.user.id, {
            creatorId,
            title,
            description,
            budget,
            deadline: deadline ? new Date(deadline) : null,
            referenceImages
        })

        return { success: true, orderId: order.id }
    } catch (error: any) {
        console.error(error)
        return { error: error.message || "Failed to create order" }
    }
}

export async function updateOrderStatus(orderId: string, status: "REQUESTED" | "ACCEPTED" | "IN_PROGRESS" | "READY" | "DELIVERED" | "COMPLETED" | "CANCELLED") {
    const session = await auth()
    if (!session?.user?.id) return { error: "Unauthorized" }

    try {
        await orderService.updateStatus(orderId, status, session.user.id)
        revalidatePath(`/orders/${orderId}`)
        revalidatePath('/dashboard')
        return { success: true }
    } catch (error: any) {
        return { error: error.message || "Failed to update status" }
    }
}
