import { userRepo } from "@/data/user-repo"
import { UserStatus } from "@prisma/client"
import bcrypt from "bcryptjs"

export class UserService {
    async register(data: { email: string; passwordRaw: string; role: any }) {
        const hashedPassword = await bcrypt.hash(data.passwordRaw, 10)
        return userRepo.create({
            email: data.email,
            passwordHash: hashedPassword,
            role: data.role,
        })
    }

    async createProfile(
        userId: string,
        data: {
            fullName: string
            bio: string
            skills: string[]
            location: any
            portfolio: string[]
            machinePhotos: string[]
        }
    ) {
        const profile = await userRepo.createProfile({
            userId,
            ...data,
            available: false, // Not available until approved
        })

        // Transition user to PENDING_APPROVAL
        await userRepo.updateStatus(userId, UserStatus.PENDING_APPROVAL)

        return profile
    }

    async getCreatorProfile(id: string) {
        return userRepo.findByIdWithProfileAndReviews(id)
    }

    async getAllCreators() {
        return userRepo.getAllCreators()
    }

    async updateStatus(userId: string, status: UserStatus) {
        return userRepo.updateStatus(userId, status)
    }

    async getPendingCreators() {
        return userRepo.getPendingCreators()
    }
}

export const userService = new UserService()
