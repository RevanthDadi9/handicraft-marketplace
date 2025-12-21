import { PrismaClient, Role } from '@prisma/client'
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
    const passwordHash = await bcrypt.hash('password123', 10)

    // Create Creators
    const creators = [
        {
            email: 'maya.embroidery@example.com',
            name: 'Maya Arts',
            bio: 'Expert in handcrafted embroidery and fabric painting with 5 years of experience.',
            skills: ['Embroidery', 'Fabric Painting', 'Knitting'],
            location: 'Bangalore, Indiranagar',
        },
        {
            email: 'rahul.pottery@example.com',
            name: 'Rahul Clay Works',
            bio: 'Traditional potter specializing in terracotta and glazed ceramicware.',
            skills: ['Pottery', 'Clay Modeling', 'Sculpting'],
            location: 'Mysore, Gokulam',
        },
        {
            email: 'priya.mehendi@example.com',
            name: 'Priya Mehendi Design',
            bio: 'Professional bridal mehendi artist for weddings and festivals.',
            skills: ['Mehendi', 'Henna Art'],
            location: 'Hyderabad, Jubilee Hills',
        },
    ]

    for (const c of creators) {
        const user = await prisma.user.upsert({
            where: { email: c.email },
            update: {},
            create: {
                email: c.email,
                passwordHash,
                role: Role.CREATOR,
                status: "ACTIVE",
                profile: {
                    create: {
                        fullName: c.name,
                        bio: c.bio,
                        skills: c.skills,
                        location: { address: c.location },
                        available: true,
                        portfolio: [],
                        machinePhotos: []
                    }
                }
            },
        })
        console.log(`Created creator: ${user.email}`)
    }

    // Create Customer
    await prisma.user.upsert({
        where: { email: 'customer@example.com' },
        update: {},
        create: {
            email: 'customer@example.com',
            passwordHash,
            role: Role.CUSTOMER,
            profile: {
                create: {
                    fullName: "Alice buyer",
                    location: { address: "Mumbai" }
                }
            }
        },
    })
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
