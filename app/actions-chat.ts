"use server"

import { auth } from "@/auth"
import { z } from "zod"
import { chatService } from "@/services/chat.service"

const messageSchema = z.object({
    orderId: z.string(),
    content: z.string().min(1),
})

export async function sendMessage(formData: z.infer<typeof messageSchema>) {
    const session = await auth()
    if (!session?.user?.id) return { error: "Unauthorized" }

    const validated = messageSchema.safeParse(formData)
    if (!validated.success) return { error: "Invalid message" }

    try {
        await chatService.sendMessage(session.user.id, validated.data.orderId, validated.data.content)
        return { success: true }
    } catch (error: any) {
        return { error: error.message || "Failed to send message" }
    }
}

export async function getMessages(orderId: string) {
    const session = await auth()
    if (!session?.user?.id) return []

    try {
        return await chatService.getOrderMessages(session.user.id, orderId)
    } catch (error) {
        return []
    }
}
