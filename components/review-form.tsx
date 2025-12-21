"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { submitReview } from "@/app/actions-review"
import { Star } from "lucide-react"

export function ReviewForm({ orderId }: { orderId: string }) {
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState("")
    const [submitted, setSubmitted] = useState(false)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (rating === 0) return

        const res = await submitReview({ orderId, rating, comment })
        if (res?.success) {
            setSubmitted(true)
        }
    }

    if (submitted) {
        return <div className="p-4 bg-green-50 text-green-700 rounded-md">Thank you for your review!</div>
    }

    return (
        <div className="border rounded-lg p-4 space-y-4">
            <h3 className="font-semibold text-lg">Leave a Review</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            className="focus:outline-none"
                        >
                            <Star
                                className={`h-8 w-8 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                            />
                        </button>
                    ))}
                </div>
                <Textarea
                    placeholder="Share your experience..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <Button type="submit" disabled={rating === 0}>Submit Review</Button>
            </form>
        </div>
    )
}
