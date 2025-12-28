import { PrismaClient, Role, UserStatus } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    const email = 'admin@auracraft.com'
    const password = 'adminpassword123'
    const hashedPassword = await bcrypt.hash(password, 10)

    // Upsert the Admin User
    const admin = await prisma.user.upsert({
        where: { email },
        update: {},
        create: {
            email,
            passwordHash: hashedPassword,
            role: Role.ADMIN,
            status: UserStatus.ACTIVE,
            profile: {
                create: {
                    fullName: 'Grand Elder',
                    bio: 'Guardian of the AuraCraft Collective.',
                    skills: ['Administration'],
                    machinePhotos: [], // Not needed for admin but schema requires array
                    portfolio: []
                }
            }
        },
    })

    console.log(`Created Admin User: ${admin.email}`)
    console.log(`Password: ${password}`)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
