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

export async function approveCreator(creatorId: string) {
    const session = await auth()
    if (!session?.user) return { error: "Unauthorized" }

    try {
        await userService.updateStatus(creatorId, "ACTIVE" as any)
        revalidatePath("/")
        revalidatePath("/creators")
        revalidatePath("/admin")
        return { success: true }
    } catch (error) {
        console.error(error)
        return { error: "Failed to approve creator" }
    }
}

export async function handleSignOut() {
    await signOut({ redirectTo: "/" })
}
