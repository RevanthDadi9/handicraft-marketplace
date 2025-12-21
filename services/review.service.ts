import { reviewRepo } from "@/data/review-repo"
import { orderRepo } from "@/data/order-repo"
import { userRepo } from "@/data/user-repo"

export class ReviewService {
    async submitReview(
        authorId: string,
        orderId: string,
        rating: number,
        comment?: string
    ) {
        const order = await orderRepo.findById(orderId)
        if (!order) throw new Error("Order not found")

        // Business Logic: Only customer can review
        if (order.customerId !== authorId) {
            throw new Error("Only customer can review this order")
        }

        const review = await reviewRepo.createReview({
            orderId,
            authorId,
            targetId: order.creatorId,
            rating,
            comment,
        })

        // Update Creator Stats
        const aggregates = await reviewRepo.getCreatorAggregates(order.creatorId)
        await userRepo.updateProfile(order.creatorId, {
            rating: aggregates._avg.rating || 0,
            reviewCount: aggregates._count.rating || 0,
        })

        return review
    }
}

export const reviewService = new ReviewService()
