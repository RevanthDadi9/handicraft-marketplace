"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { createCreatorProfile } from "@/app/actions"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

import { UploadButton } from "@/lib/uploadthing"

const formSchema = z.object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    bio: z.string().min(10, "Bio must be at least 10 characters"),
    skills: z.string().min(2, "Add at least one skill"),
    location: z.string().min(2, "Location is required"),
    portfolio: z.array(z.string()).min(1, "At least one portfolio masterpiece is required"),
    machinePhotos: z.array(z.string()).min(1, "Photos of your setup/tools are mandatory for trust"),
})

export default function OnboardingPage() {
    const router = useRouter()
    const { data: session } = useSession()
    const [step, setStep] = useState(1)
    const [error, setError] = useState("")

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            bio: "",
            skills: "",
            location: "",
            portfolio: [],
            machinePhotos: []
        },
    })

    const portfolio = form.watch("portfolio")
    const machinePhotos = form.watch("machinePhotos")

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (!session?.user?.id) return;
        setError("")
        const res = await createCreatorProfile(session.user.id, values)
        if (res?.error) {
            setError(JSON.stringify(res.error))
        } else {
            router.push("/dashboard")
        }
    }

    const nextStep = async () => {
        let fieldsToValidate: any[] = []
        if (step === 1) fieldsToValidate = ["fullName", "bio", "location"]
        if (step === 2) fieldsToValidate = ["skills"]
        if (step === 3) fieldsToValidate = ["portfolio", "machinePhotos"]

        const isValid = await form.trigger(fieldsToValidate)
        if (isValid) setStep(step + 1)
    }

    const progress = (step / 4) * 100

    return (
        <div className="flex min-h-screen items-center justify-center p-6 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 blur-[120px] -z-10" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 blur-[120px] -z-10" />

            <Card className="w-full max-w-xl glass-card border-none overflow-hidden pb-8">
                {/* Progress Bar */}
                <div className="h-1.5 w-full bg-white/5">
                    <div
                        className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500 ease-in-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <CardHeader className="text-center pt-8 pb-4 border-b border-white/5">
                    <div className="flex justify-center mb-4">
                        <div className="bg-white/5 px-4 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] text-primary uppercase">
                            Step {step} of 4
                        </div>
                    </div>
                    <CardTitle className="text-4xl font-bold font-[family-name:var(--font-playfair)] text-gradient">
                        {step === 1 && "Identity"}
                        {step === 2 && "Mastery"}
                        {step === 3 && "Evidence"}
                        {step === 4 && "Consecration"}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground mt-2 italic text-sm">
                        {step === 1 && "The artist behind the artifact."}
                        {step === 2 && "The lineages of your expertise."}
                        {step === 3 && "Visual proof of your craftsmanship."}
                        {step === 4 && "Final review of your artisan entry."}
                    </CardDescription>
                </CardHeader>

                <CardContent className="p-10">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                            {step === 1 && (
                                <div className="space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="fullName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-[10px] font-bold tracking-widest uppercase text-white/40">Artistic Signature (Name)</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Jane Doe Creations" {...field} className="bg-white/5 border-white/10 rounded-xl py-6 focus-visible:ring-primary/50" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="bio"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-[10px] font-bold tracking-widest uppercase text-white/40">Manifesto (Bio)</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder="I specialize in..." {...field} className="bg-white/5 border-white/10 rounded-xl focus-visible:ring-primary/50 min-h-[120px]" />
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
                                                <FormLabel className="text-[10px] font-bold tracking-widest uppercase text-white/40">Atelier Location</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="City, Area" {...field} className="bg-white/5 border-white/10 rounded-xl py-6 focus-visible:ring-primary/50" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="skills"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-[10px] font-bold tracking-widest uppercase text-white/40">Masteries (Comma separated)</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Fine Embroidery, Pottery, Sculpting" {...field} className="bg-white/5 border-white/10 rounded-xl py-6 focus-visible:ring-primary/50" />
                                                </FormControl>
                                                <CardDescription className="text-[10px] mt-2 italic px-2">Example: Embroidery, Sculpting, Tailoring</CardDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            )}

                            {step === 3 && (
                                <div className="space-y-10">
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-bold tracking-widest uppercase text-white/40 flex justify-between">
                                            <span>Masterpieces (Portfolio)</span>
                                            <span className={portfolio.length > 0 ? "text-primary" : "text-yellow-500"}>{portfolio.length} Uploaded</span>
                                        </label>
                                        <div className="bg-white/5 border border-dashed border-white/10 rounded-2xl p-8 text-center text-sm">
                                            <UploadButton
                                                endpoint="imageUploader"
                                                onClientUploadComplete={(res) => {
                                                    const urls = res.map(f => f.url)
                                                    form.setValue("portfolio", [...portfolio, ...urls])
                                                }}
                                                appearance={{
                                                    button: "bg-primary text-black font-bold rounded-full px-8",
                                                    allowedContent: "text-white/20 uppercase text-[8px] tracking-widest"
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-[10px] font-bold tracking-widest uppercase text-white/40 flex justify-between">
                                            <span>The Loom (Tools/Machine Photos)</span>
                                            <span className={machinePhotos.length > 0 ? "text-primary" : "text-yellow-500"}>{machinePhotos.length} Uploaded</span>
                                        </label>
                                        <div className="bg-white/5 border border-dashed border-white/10 rounded-2xl p-8 text-center text-sm">
                                            <UploadButton
                                                endpoint="imageUploader"
                                                onClientUploadComplete={(res) => {
                                                    const urls = res.map(f => f.url)
                                                    form.setValue("machinePhotos", [...machinePhotos, ...urls])
                                                }}
                                                appearance={{
                                                    button: "bg-accent text-white font-bold rounded-full px-8",
                                                    allowedContent: "text-white/20 uppercase text-[8px] tracking-widest"
                                                }}
                                            />
                                        </div>
                                    </div>
                                    {form.formState.errors.portfolio && <p className="text-xs text-red-500">{form.formState.errors.portfolio.message}</p>}
                                    {form.formState.errors.machinePhotos && <p className="text-xs text-red-500">{form.formState.errors.machinePhotos.message}</p>}
                                </div>
                            )}

                            {step === 4 && (
                                <div className="space-y-6 text-center py-4">
                                    <div className="bg-primary/5 border border-primary/10 rounded-2xl p-8">
                                        <h3 className="text-xl font-bold text-primary mb-4 italic">Ready for Consecration?</h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            By submitting, your profile will be sent to the **Elders (Admins)** for review.
                                            We prioritize quality and trust within our collective. You will receive an email
                                            once your artisan status is confirmed.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 text-left">
                                        <div className="glass p-4 rounded-xl">
                                            <span className="text-[8px] block uppercase text-white/40 mb-1">Status</span>
                                            <span className="text-xs font-bold text-yellow-500">PENDING_APPROVAL</span>
                                        </div>
                                        <div className="glass p-4 rounded-xl">
                                            <span className="text-[8px] block uppercase text-white/40 mb-1">Identity</span>
                                            <span className="text-xs font-bold truncate">{form.getValues("fullName")}</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {error && (
                                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-500 text-center italic leading-relaxed">
                                    {error}
                                </div>
                            )}

                            <div className="flex gap-4 pt-4">
                                {step > 1 && (
                                    <Button type="button" variant="outline" onClick={() => setStep(step - 1)} className="rounded-full px-8 border-white/10 hover:bg-white/5">
                                        Back
                                    </Button>
                                )}
                                {step < 4 ? (
                                    <Button type="button" onClick={nextStep} className="flex-1 h-14 rounded-full text-lg font-bold glow-border overflow-visible group">
                                        Continue
                                    </Button>
                                ) : (
                                    <Button type="submit" className="flex-1 h-14 rounded-full text-lg font-bold bg-primary hover:bg-primary/80 text-black shadow-[0_0_20px_rgba(255,215,0,0.3)]">
                                        Submit for Review
                                    </Button>
                                )}
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
