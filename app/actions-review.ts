"use server"

import { auth } from "@/auth"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { reviewService } from "@/services/review.service"

const reviewSchema = z.object({
    orderId: z.string(),
    rating: z.coerce.number().min(1).max(5),
    comment: z.string().optional(),
})

export async function submitReview(formData: z.infer<typeof reviewSchema>) {
    const session = await auth()
    if (!session?.user?.id) return { error: "Unauthorized" }

    const validated = reviewSchema.safeParse(formData)
    if (!validated.success) return { error: "Invalid review" }

    const { orderId, rating, comment } = validated.data

    try {
        await reviewService.submitReview(session.user.id, orderId, rating, comment)
        revalidatePath(`/orders/${orderId}`)
        return { success: true }
    } catch (error: any) {
        console.error(error)
        return { error: error.message || "Failed to submit review" }
    }
}
