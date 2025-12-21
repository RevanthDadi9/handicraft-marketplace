"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { createPaymentSession } from "@/app/actions-payment"
import { Loader2 } from "lucide-react"

export function PaymentModal({ orderId, amount }: { orderId: string, amount: number }) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    async function handlePayment() {
        setLoading(true)

        const res = await createPaymentSession(orderId, amount)
        setLoading(false)

        if (res?.success && res.url) {
            window.location.href = res.url
        } else {
            alert("Payment failed")
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="lg" className="w-full sm:w-auto">Pay & Start Order</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Complete Payment</DialogTitle>
                    <DialogDescription>
                        You are paying <span className="font-bold text-foreground">${amount}</span> to start this order.
                        This is a simulation (no real money charged).
                    </DialogDescription>
                </DialogHeader>

                <div className="py-6 flex justify-center">
                    <div className="bg-gray-100 p-4 rounded-lg border w-full text-center">
                        <p className="text-sm text-muted-foreground mb-2">Saved Card</p>
                        <div className="font-mono text-lg">**** **** **** 4242</div>
                    </div>
                </div>

                <DialogFooter>
                    <Button onClick={handlePayment} disabled={loading} className="w-full">
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {loading ? "Processing..." : `Pay $${amount}`}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
