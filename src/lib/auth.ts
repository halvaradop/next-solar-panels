import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"

export const { auth, signIn, signOut, handlers } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                const { email, password } = credentials as { email: string; password: string }
                const authorized = await prisma.users.findFirst({
                    where: {
                        email,
                        password,
                    },
                    select: {
                        userId: true,
                        email: true,
                        roleId: true,
                        firstName: true,
                    },
                })
                if (authorized) {
                    const role = await prisma.roles.findFirst({
                        where: {
                            roleId: authorized.roleId,
                        },
                    })
                    const { email, firstName: name, userId: id } = authorized
                    return {
                        email,
                        name,
                        id: id.toString(),
                        role: role?.roleName,
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
