import { prisma } from "@/lib/prisma"
import { Role, UserStatus } from "@prisma/client"

export class UserRepository {
    async findByEmail(email: string) {
        return prisma.user.findUnique({
            where: { email },
        })
    }

    async findById(id: string) {
        return prisma.user.findUnique({
            where: { id },
        })
    }

    async findByIdWithProfileAndReviews(id: string) {
        return prisma.user.findUnique({
            where: { id },
            include: {
                profile: true,
                receivedOrders: {
                    include: {
                        review: {
                            include: { author: { include: { profile: true } } },
                        },
                    },
                },
            },
        })
    }

    async create(data: { email: string; passwordHash: string; role: Role }) {
        return prisma.user.create({ data })
    }

    async updateStatus(userId: string, status: UserStatus) {
        return prisma.user.update({
            where: { id: userId },
            data: { status }
        })
    }

    async createProfile(data: {
        userId: string
        fullName: string
        bio: string
        skills: string[]
        location: any
        available: boolean
        portfolio: string[]
        machinePhotos: string[]
    }) {
        return prisma.profile.create({ data })
    }

    async updateProfile(userId: string, data: any) {
        return prisma.profile.upsert({
            where: { userId },
            update: data,
            create: {
                userId,
                fullName: data.fullName || "Unnamed Artisan",
                bio: data.bio || "No bio yet.",
                skills: data.skills || [],
                location: data.location || { address: "Unknown" },
                available: data.available ?? false,
                portfolio: data.portfolio || [],
                machinePhotos: data.machinePhotos || [],
                ...data
            }
        })
    }

    async getAllCreators() {
        return prisma.user.findMany({
            where: {
                role: Role.CREATOR,
                status: "ACTIVE" // Only approved creators are public
            },
            include: { profile: true },
        })
    }

    async getPendingCreators() {
        return prisma.user.findMany({
            where: {
                role: Role.CREATOR,
                status: "PENDING_APPROVAL" as any
            },
            include: { profile: true },
        })
    }
}

export const userRepo = new UserRepository()
