"use server"

import { auth } from "@/auth"
import { paymentService } from "@/services/payment.service"

export async function createPaymentSession(orderId: string, amount: number) {
    const session = await auth()
    if (!session?.user?.id) return { error: "Unauthorized" }

    try {
        const result = await paymentService.createCheckoutSession(
            orderId,
            `Order #${orderId}`,
            amount
        )
        return { success: true, url: result.url }
    } catch (error) {
        return { error: "Payment initiation failed" }
    }
}
