import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"

export const { auth, signIn, signOut, handlers } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {
                    type: "text",
                },
                password: {},
            },
            async authorize(credentials) {
                const { email, password } = credentials as { email: string; password: string }
                const authorized = await prisma.user.findFirst({
                    where: {
                        email,
                    },
                    select: {
                        userId: true,
                        email: true,
                        firstName: true,
                        password: true,
                        role: {
                            select: {
                                roleName: true,
                            },
                        },
                    },
                })
                if (authorized) {
                    const isEquals = password === authorized.password
                    if (isEquals) {
                        return {
                            email: authorized.email,
                            name: authorized.firstName,
                            id: authorized.userId.toString(),
                            role: authorized.role?.roleName,
                        }
                    }
                }
                return null
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user
            }
            return token
        },
        async session({ session, token }) {
            if (token.user) {
                session.user = token.user
            }
            return session
        },
    },
})
