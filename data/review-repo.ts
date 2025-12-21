import { prisma } from "@/lib/prisma"

export class ReviewRepository {
    async createReview(data: {
        orderId: string
        authorId: string
        targetId: string
        rating: number
        comment?: string
    }) {
        return prisma.review.create({ data })
    }

    async getCreatorAggregates(creatorId: string) {
        return prisma.review.aggregate({
            where: { targetId: creatorId },
            _avg: { rating: true },
            _count: { rating: true },
        })
    }
}

export const reviewRepo = new ReviewRepository()
