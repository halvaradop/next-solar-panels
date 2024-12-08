import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import { Roles } from "@/lib/@types/types"

export const { auth, signIn, signOut, handlers } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                const { email, password } = credentials as { email: string; password: string }
                const authorized = await prisma.contactPerson.findFirst({
                    where: {
                        email,
                    },
                    select: {
                        idContactPerson: true,
                        email: true,
                        firstName: true,
                        lastName: true,
                        password: true,
                        role: {
                            select: {
                                name: true,
                            },
                        },
                    },
                })
                if (authorized) {
                    const isEquals = password === authorized.password
                    const {
                        email,
                        firstName,
                        lastName,
                        role: { name },
                    } = authorized
                    if (isEquals) {
                        return {
                            email,
                            firstName,
                            lastName,
                            id: authorized.idContactPerson.toString(),
                            role: name as Roles,
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
