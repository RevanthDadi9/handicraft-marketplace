import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { userRepo } from "@/data/user-repo"
import { prisma } from "@/lib/prisma" // Needed for adapter
import bcrypt from "bcryptjs"
import { z } from "zod"
import { authConfig } from "./auth.config"

async function getUser(email: string) {
    try {
        const user = await userRepo.findByEmail(email);
        return user;
    } catch (error) {
        // console.error('Failed to fetch user:', error);
        return null;
    }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    adapter: PrismaAdapter(prisma),
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await getUser(email);
                    if (!user) return null;

                    const passwordsMatch = await bcrypt.compare(password, user.passwordHash || "");
                    if (passwordsMatch) return user;
                }

                console.log('Invalid credentials');
                return null;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = (user as any).role
            }
            return token
        },
        async session({ session, token }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
                session.user.role = token.role as any; // Type casting for convenience
            }
            return session;
        }
    },
    session: {
        strategy: "jwt"
    }
})
