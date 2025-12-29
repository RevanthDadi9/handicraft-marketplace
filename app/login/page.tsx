"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

export default function LoginPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get("callbackUrl") || "/dashboard"
    const [error, setError] = useState("")

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setError("")
        try {
            const res = await signIn("credentials", {
                email: values.email,
                password: values.password,
                redirect: false,
            })

            if (res?.error) {
                setError("Invalid email or password")
            } else {
                router.push(callbackUrl)
                router.refresh()
            }
        } catch (error) {
            setError("Something went wrong. Please try again.")
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center px-6 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 blur-[120px] -z-10" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 blur-[120px] -z-10" />

            <Card className="w-full max-w-md glass-card border-none overflow-hidden">
                <CardHeader className="text-center pt-10 pb-6 border-b border-white/5">
                    <CardTitle className="text-4xl font-bold font-[family-name:var(--font-playfair)] text-gradient">Welcome Back</CardTitle>
                    <CardDescription className="text-muted-foreground mt-2 italic text-sm">Enter the collective and continue your legacy.</CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[10px] font-bold tracking-widest uppercase text-white/40">Identity (Email)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="artisan@kalasync.in" {...field} className="bg-white/5 border-white/10 rounded-xl py-6 focus-visible:ring-primary/50" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[10px] font-bold tracking-widest uppercase text-white/40">Credential (Password)</FormLabel>
                                        <FormControl>
                                            <Input type="password" {...field} className="bg-white/5 border-white/10 rounded-xl py-6 focus-visible:ring-primary/50" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {error && (
                                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-500 text-center italic">
                                    {error}
                                </div>
                            )}
                            <Button type="submit" className="w-full h-14 rounded-full text-lg font-bold glow-border overflow-visible group">
                                Enter Aura
                            </Button>
                            <p className="text-center text-xs text-white/40 mt-6">
                                New to the collective?{" "}
                                <Link href="/register" className="text-primary hover:underline font-bold">
                                    Join Now
                                </Link>
                            </p>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
