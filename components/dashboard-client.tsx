"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { UploadButton } from "@/lib/uploadthing"
import { updateCreatorProfile } from "@/app/actions"

const profileSchema = z.object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    bio: z.string().min(10, "Bio must be at least 10 characters"),
    skills: z.string().min(2, "Add at least one skill"),
    location: z.string().min(2, "Location is required"),
    portfolio: z.array(z.string()).min(1, "At least one portfolio masterpiece is required"),
    machinePhotos: z.array(z.string()).min(1, "Photos of your setup/tools are mandatory for trust"),
    hourlyRate: z.coerce.number().optional(),
    available: z.boolean().default(true),
})

export function DashboardClient({ user, orders }: { user: any, orders: any[] }) {
    const [activeTab, setActiveTab] = useState<"overview" | "profile">("overview")
    const router = useRouter()

    // -- Profile Form Setup --
    const isCreator = user.role === "CREATOR"
    const profile = user.profile || {}
    const defaultAvailable = profile.available ?? false

    // Safely handle location json
    let locationStr = ""
    if (typeof profile.location === 'object' && profile.location?.address) {
        locationStr = profile.location.address
    } else if (typeof profile.location === 'string') {
        locationStr = profile.location
    }

    const form = useForm({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            fullName: profile.fullName || "",
            bio: profile.bio || "",
            skills: profile.skills?.join(", ") || "",
            location: locationStr,
            portfolio: profile.portfolio || [],
            machinePhotos: profile.machinePhotos || [],
            hourlyRate: profile.hourlyRate ? Number(profile.hourlyRate) : undefined,
            available: defaultAvailable,
        },
    })

    const portfolio = form.watch("portfolio")
    const machinePhotos = form.watch("machinePhotos")
    const isSubmitting = form.formState.isSubmitting

    async function onProfileSubmit(values: z.infer<typeof profileSchema>) {
        const res = await updateCreatorProfile(user.id, values)
        if (res?.error) {
            toast.error(typeof res.error === 'string' ? res.error : "Failed to update profile")
        } else {
            toast.success("Profile updated successfully", {
                description: "Your changes are now live on your public artisan profile."
            })
            router.refresh()
        }
    }

    return (
        <div className="container mx-auto py-12 px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div>
                    <h1 className="text-4xl font-bold font-[family-name:var(--font-playfair)]">
                        {isCreator ? "Artisan Dashboard" : "Patron Dashboard"}
                    </h1>
                    <p className="text-muted-foreground mt-2">Welcome back, {profile.fullName || user.email}</p>
                </div>

                {isCreator && (
                    <div className="flex gap-4">
                        <Link href={`/creators/${user.id}`}>
                            <Button variant="outline" className="rounded-full border-white/10">View Public Profile</Button>
                        </Link>
                    </div>
                )}
            </div>

            {/* Tabs Navigation */}
            <div className="flex gap-6 border-b border-white/5 mb-8">
                <button
                    onClick={() => setActiveTab("overview")}
                    className={`pb-4 text-sm font-bold uppercase tracking-widest transition-colors ${activeTab === "overview" ? "text-primary border-b-2 border-primary" : "text-white/40 hover:text-white"}`}
                >
                    Overview & Orders
                </button>
                {isCreator && (
                    <button
                        onClick={() => setActiveTab("profile")}
                        className={`pb-4 text-sm font-bold uppercase tracking-widest transition-colors ${activeTab === "profile" ? "text-primary border-b-2 border-primary" : "text-white/40 hover:text-white"}`}
                    >
                        Edit Profile
                    </button>
                )}
            </div>

            {/* -- OVERVIEW TAB -- */}
            {activeTab === "overview" && (
                <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* Pending Status Banner */}
                    {user.role === "CREATOR" && (
                        <div className="space-y-4">
                            {user.status === "PENDING_VERIFICATION" && (
                                <div className="p-8 glass border-yellow-500/20 bg-yellow-500/[0.02] rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-6 overflow-hidden relative">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 blur-3xl -mr-16 -mt-16" />
                                    <div className="space-y-2 relative z-10">
                                        <h3 className="text-yellow-500 font-bold uppercase tracking-widest text-[10px]">Profile Incomplete</h3>
                                        <p className="text-sm text-foreground/70 font-light leading-relaxed">Save your profile details below to submit your masterpieces for review by the Elders.</p>
                                    </div>
                                    <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20 text-[9px] font-bold uppercase tracking-widest px-4 h-8 w-fit shrink-0">Incomplete</Badge>
                                </div>
                            )}

                            {user.status === "PENDING_APPROVAL" && (
                                <div className="p-8 glass border-primary/20 bg-primary/[0.02] rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-6 overflow-hidden relative">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl -mr-16 -mt-16" />
                                    <div className="space-y-2 relative z-10">
                                        <h3 className="text-primary font-bold uppercase tracking-widest text-[10px]">Consecration in Progress</h3>
                                        <p className="text-sm text-foreground/70 font-light leading-relaxed">The Elders are currently reviewing your workspace and masteries. You will be activated shortly.</p>
                                    </div>
                                    <Badge className="bg-primary/10 text-primary border-primary/20 text-[9px] font-bold uppercase tracking-widest px-4 h-8 w-fit shrink-0">Pending Approval</Badge>
                                </div>
                            )}

                            {user.status === "ACTIVE" && (
                                <div className="p-8 glass border-green-500/20 bg-green-500/[0.02] rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-6 overflow-hidden relative">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 blur-3xl -mr-16 -mt-16" />
                                    <div className="space-y-2 relative z-10">
                                        <h3 className="text-green-500 font-bold uppercase tracking-widest text-[10px]">Artisan Activated</h3>
                                        <p className="text-sm text-foreground/70 font-light leading-relaxed">Your shop is now live in the collective. Patrons can discover and request your masteries.</p>
                                    </div>
                                    <div className="flex gap-4 relative z-10">
                                        <Link href={`/creators/${user.id}`}>
                                            <Button size="sm" variant="outline" className="border-green-500/20 text-green-500 hover:bg-green-500/10 h-8 rounded-full text-[9px] font-bold uppercase tracking-widest px-4">View Public Profile</Button>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase">
                                {user.role === "CREATOR" ? "Active Assignments" : "Service History"} ({orders.length})
                            </h2>
                        </div>

                        {orders.length === 0 ? (
                            <div className="glass-card p-20 text-center border-dashed border-white/[0.05]">
                                <p className="text-muted-foreground font-light italic">No activity recorded in the loom yet.</p>
                            </div>
                        ) : (
                            <div className="grid gap-4">
                                {orders.map((order: any) => (
                                    <Link href={`/orders/${order.id}`} key={order.id} className="block group">
                                        <Card className="glass-card border-white/[0.03] hover:border-white/[0.08] transition-all duration-300">
                                            <div className="p-8">
                                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                                                    <div>
                                                        <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">{order.title}</h3>
                                                        <div className="text-[10px] uppercase tracking-widest text-white/30 font-medium">
                                                            {user.role === "CREATOR"
                                                                ? `Patron: ${order.customer.profile?.fullName || order.customer.email}`
                                                                : `Artisan: ${order.creator.profile?.fullName}`}
                                                        </div>
                                                    </div>
                                                    <Badge variant="secondary" className="bg-white/5 border-white/5 text-[9px] tracking-widest uppercase px-3 h-6 font-bold">
                                                        {order.status}
                                                    </Badge>
                                                </div>
                                                <div className="flex justify-between items-end gap-10">
                                                    <p className="text-sm text-muted-foreground line-clamp-1 max-w-xl font-light italic">
                                                        {order.description}
                                                    </p>
                                                    <div className="text-2xl font-medium tracking-tight text-white">
                                                        ${Number(order.budget).toLocaleString()}
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* -- PROFILE TAB -- */}
            {activeTab === "profile" && isCreator && (
                <div className="max-w-3xl glass-card p-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onProfileSubmit)} className="space-y-8">
                            <div className="grid md:grid-cols-2 gap-8">
                                <FormField
                                    control={form.control}
                                    name="fullName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Artistic Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="location"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Location</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="bio"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Manifesto (Bio)</FormLabel>
                                        <FormControl>
                                            <Textarea {...field} className="min-h-[120px]" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="skills"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Skills (Comma separated)</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="space-y-4">
                                <label className="text-[10px] font-bold tracking-widest uppercase text-white/40 flex justify-between">
                                    <span>Masterpieces (Portfolio)</span>
                                    <span className={portfolio.length > 0 ? "text-primary" : "text-yellow-500"}>{portfolio.length} Uploaded</span>
                                </label>
                                <div className="grid grid-cols-4 gap-4 mb-4">
                                    {portfolio.map((url: string, i: number) => (
                                        <div key={i} className="relative aspect-square group">
                                            <img src={url} alt="Portfolio" className="w-full h-full object-cover rounded-lg border border-white/10" />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newUrls = portfolio.filter((_: string, idx: number) => idx !== i)
                                                    form.setValue("portfolio", newUrls)
                                                }}
                                                className="absolute top-1 right-1 bg-black/50 hover:bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <div className="bg-white/5 border border-dashed border-white/10 rounded-2xl p-6 text-center text-sm">
                                    <UploadButton
                                        endpoint="imageUploader"
                                        onClientUploadComplete={(res) => {
                                            const urls = res.map(f => f.url)
                                            form.setValue("portfolio", [...portfolio, ...urls])
                                            toast.success("Masterpiece uploaded")
                                        }}
                                        appearance={{
                                            button: "bg-primary text-black font-bold rounded-full px-8 cursor-pointer hover:bg-primary/90 transition-all",
                                            allowedContent: "text-white/20 uppercase text-[8px] tracking-widest"
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] font-bold tracking-widest uppercase text-white/40 flex justify-between">
                                    <span>Studio & Machine Photos</span>
                                    <span className={machinePhotos.length > 0 ? "text-primary" : "text-yellow-500"}>{machinePhotos.length} Uploaded</span>
                                </label>
                                <div className="grid grid-cols-4 gap-4 mb-4">
                                    {machinePhotos.map((url: string, i: number) => (
                                        <div key={i} className="relative aspect-square group">
                                            <img src={url} alt="Machine" className="w-full h-full object-cover rounded-lg border border-white/10" />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newUrls = machinePhotos.filter((_: string, idx: number) => idx !== i)
                                                    form.setValue("machinePhotos", newUrls)
                                                }}
                                                className="absolute top-1 right-1 bg-black/50 hover:bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <div className="bg-white/5 border border-dashed border-white/10 rounded-2xl p-6 text-center text-sm">
                                    <UploadButton
                                        endpoint="imageUploader"
                                        onClientUploadComplete={(res) => {
                                            const urls = res.map(f => f.url)
                                            form.setValue("machinePhotos", [...machinePhotos, ...urls])
                                            toast.success("Studio photo uploaded")
                                        }}
                                        appearance={{
                                            button: "bg-accent text-white font-bold rounded-full px-8 cursor-pointer hover:bg-accent/90 transition-all",
                                            allowedContent: "text-white/20 uppercase text-[8px] tracking-widest"
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end pt-6">
                                <Button type="submit" size="lg" disabled={isSubmitting} className="rounded-full px-8 font-bold cursor-pointer">
                                    {isSubmitting ? "Saving Changes..." : "Save Profile"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            )}
        </div>
    )
}
