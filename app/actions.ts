"use server"

import { z } from "zod"
import { signIn, auth, signOut } from "@/auth"
import { revalidatePath } from "next/cache"
import { userService } from "@/services/user.service"

const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(["CUSTOMER", "CREATOR"]),
})

export async function registerUser(formData: z.infer<typeof registerSchema>) {
    const validatedFields = registerSchema.safeParse(formData)

    if (!validatedFields.success) {
        return { error: "Invalid fields" }
    }

    const { email, password, role } = validatedFields.data

    try {
        await userService.register({ email, passwordRaw: password, role })

        // Auto sign-in
        await signIn("credentials", {
            email,
            password,
            redirect: false
        });

        return { success: true }
    } catch (error: any) {
        if (error.code === 'P2002') {
            return { error: "User already exists" }
        }
        console.error(error)
        return { error: "Failed to create user" }
    }
}

const profileSchema = z.object({
    fullName: z.string().min(2),
    bio: z.string().min(10),
    skills: z.string(),
    location: z.string(),
    portfolio: z.array(z.string()).min(1, "Portfolio is mandatory"),
    machinePhotos: z.array(z.string()).min(1, "Machine/Tool photos are mandatory for trust")
})

export async function createCreatorProfile(userId: string, formData: z.infer<typeof profileSchema>) {
    const validatedFields = profileSchema.safeParse(formData)
    if (!validatedFields.success) return { error: validatedFields.error.format() }

    const { fullName, bio, skills, location, portfolio, machinePhotos } = validatedFields.data

    try {
        await userService.createProfile(userId, {
            fullName,
            bio,
            skills: skills.split(",").map(ls => ls.trim()),
            location: { address: location },
            portfolio,
            machinePhotos
        })

        revalidatePath("/admin")
        return { success: true }
    } catch (error) {
        console.error(error)
        return { error: "Failed to create profile" }
    }
}

export async function approveCreator(creatorId: string, _formData?: FormData) {
    const session = await auth()
    if (!session?.user) return { error: "Unauthorized" }

    try {
        await userService.updateStatus(creatorId, "ACTIVE" as any)
        revalidatePath("/")
        revalidatePath("/creators")
        revalidatePath(`/creators/${creatorId}`)
        revalidatePath("/admin")
        revalidatePath("/dashboard")
        return { success: true }
    } catch (error) {
        console.error(error)
        return { error: "Failed to approve creator" }
    }
}

export async function updateCreatorProfile(userId: string, formData: any) {
    const session = await auth()
    if (!session?.user || session.user.id !== userId) return { error: "Unauthorized" }

    // Re-use schema or create partial
    const updateSchema = z.object({
        fullName: z.string().min(2).optional(),
        bio: z.string().min(10).optional(),
        skills: z.string().optional(),
        location: z.string().optional(),
        portfolio: z.array(z.string()).optional(),
        machinePhotos: z.array(z.string()).optional(),
        hourlyRate: z.coerce.number().optional(),
        available: z.boolean().optional(),
    })

    const validatedFields = updateSchema.safeParse(formData)
    if (!validatedFields.success) return { error: validatedFields.error.format() }

    const data = validatedFields.data
    const updateData: any = { ...data }

    // Transform skills string to array if present
    if (data.skills) {
        updateData.skills = data.skills.split(",").map(s => s.trim())
    }
    // Transform location string to object if present
    if (data.location) {
        updateData.location = { address: data.location }
    }

    try {
        await userService.updateProfile(userId, updateData)

        // Ensure they are moved to PENDING_APPROVAL if they were just registered
        const user = await userService.getCreatorProfile(userId)
        if (user && user.status === "PENDING_VERIFICATION") {
            await userService.updateStatus(userId, "PENDING_APPROVAL" as any)
        }

        revalidatePath("/dashboard")
        revalidatePath("/admin")
        revalidatePath(`/creators/${userId}`)
        return { success: true }
    } catch (error) {
        console.error(error)
        return { error: "Failed to update profile" }
    }
}

export async function handleSignOut() {
    await signOut({ redirectTo: "/" })
}
