import { prisma } from "@/lib/prisma"
import { Order, OrderStatus } from "@prisma/client"

export class OrderRepository {
  async create(data: {
    customerId: string
    creatorId: string
    title: string
    description: string
    budget: number
    status?: OrderStatus
    deadline?: Date | null
    referenceImages?: string[]
  }) {
    return prisma.order.create({
      data: {
        title: data.title,
        description: data.description,
        budget: data.budget,
        deadline: data.deadline,
        customerId: data.customerId,
        creatorId: data.creatorId,
        referenceImages: data.referenceImages || [],
        status: data.status || "CREATED",
      },
    })
  }

  async findById(id: string) {
    return prisma.order.findUnique({
      where: { id },
    })
  }

  async findByIdWithDetails(id: string) {
    return prisma.order.findUnique({
      where: { id },
      include: {
        customer: { include: { profile: true } },
        creator: { include: { profile: true } },
        milestones: true,
        messages: true,
        review: true,
      },
    })
  }

  async findByUserId(userId: string) {
    return prisma.order.findMany({
      where: {
        OR: [{ customerId: userId }, { creatorId: userId }],
      },
      include: {
        customer: { include: { profile: true } },
        creator: { include: { profile: true } },
      },
      orderBy: { updatedAt: "desc" },
    })
  }

  async updateStatus(id: string, status: OrderStatus) {
    return prisma.order.update({
      where: { id },
      data: { status },
    })
  }
}

export const orderRepo = new OrderRepository()
