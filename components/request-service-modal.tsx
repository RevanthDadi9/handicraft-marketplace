"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { createOrder } from "@/app/actions-order"
import { useRouter } from "next/navigation"
import { UploadButton } from "@/lib/uploadthing"

const formSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    budget: z.coerce.number().min(1, "Budget must be at least 1"),
    deadline: z.string().optional(),
})

export function RequestServiceModal({
    creatorId,
    creatorName,
}: {
    creatorId: string
    creatorName: string
}) {
    const [open, setOpen] = useState(false)
    const [images, setImages] = useState<string[]>([])
    const router = useRouter()

    const form = useForm<any>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            budget: 100,
            deadline: "",
        },
    })

    async function onSubmit(values: any) {
        const res = await createOrder({ ...values, creatorId, referenceImages: images })
        if (res?.error) {
            alert(res.error)
        } else {
            setOpen(false)
            router.push("/dashboard")
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="lg">Request Service</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Request Service from {creatorName}</DialogTitle>
                    <DialogDescription>
                        Describe your requirements and budget.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. Custom Embroidery for Wedding" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Details about design, size, colors..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex gap-4">
                            <FormField
                                control={form.control}
                                name="budget"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Budget ($)</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="deadline"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Deadline (Optional)</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="space-y-2">
                            <FormLabel>Reference Images ({images.length})</FormLabel>
                            <div className="flex flex-wrap gap-2 mb-2">
                                {images.map((url, i) => (
                                    <img key={i} src={url} className="w-12 h-12 object-cover rounded border" alt="ref" />
                                ))}
                            </div>
                            <UploadButton
                                endpoint="imageUploader"
                                onClientUploadComplete={(res: any) => {
                                    setImages(prev => [...prev, ...res.map((r: any) => r.url)])
                                }}
                                onUploadError={(error: Error) => {
                                    alert(`ERROR! ${error.message}`);
                                }}
                            />
                        </div>

                        <Button type="submit" className="w-full">Send Request</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
