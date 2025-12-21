import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "mock_key", {
  // @ts-ignore - Stripe types might be ahead/behind local env
  apiVersion: "2025-12-15.clover",
})

export class PaymentService {
  async createCheckoutSession(orderId: string, title: string, amount: number) {
    if (!process.env.STRIPE_SECRET_KEY) {
      console.warn("Stripe key missing, returning mock session")
      return { url: `http://localhost:3000/orders/${orderId}?mock_success=true` }
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: title,
            },
            unit_amount: Math.round(amount * 100), // cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/orders/${orderId}?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/orders/${orderId}?canceled=true`,
      metadata: {
        orderId,
      },
    })

    return { url: session.url }
  }

  // Webhook handler would go here
}

export const paymentService = new PaymentService()
