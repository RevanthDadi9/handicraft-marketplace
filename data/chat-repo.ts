import { prisma } from "@/lib/prisma"

export class ChatRepository {
    async createMessage(data: { orderId: string; senderId: string; content: string }) {
        return prisma.message.create({ data })
    }

    async findMessagesByOrderId(orderId: string) {
        return prisma.message.findMany({
            where: { orderId },
            orderBy: { createdAt: "asc" },
            include: {
                sender: {
                    select: {
                        id: true,
                        email: true,
                        profile: { select: { fullName: true } },
                    },
                },
            },
        })
    }
}

export const chatRepo = new ChatRepository()
