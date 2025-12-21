import { chatRepo } from "@/data/chat-repo"
import { orderRepo } from "@/data/order-repo"

export class ChatService {
    async sendMessage(userId: string, orderId: string, content: string) {
        // Business Logic: Verify user is part of order
        const order = await orderRepo.findById(orderId)
        if (!order) throw new Error("Order not found")
        if (order.customerId !== userId && order.creatorId !== userId) {
            throw new Error("Unauthorized to message in this order")
        }

        return chatRepo.createMessage({
            orderId,
            senderId: userId,
            content,
        })
    }

    async getOrderMessages(userId: string, orderId: string) {
        const order = await orderRepo.findById(orderId)
        if (!order) throw new Error("Order not found")
        if (order.customerId !== userId && order.creatorId !== userId) {
            throw new Error("Unauthorized to view messages")
        }

        return chatRepo.findMessagesByOrderId(orderId)
    }
}

export const chatService = new ChatService()
