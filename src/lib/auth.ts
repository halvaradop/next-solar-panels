import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import { User } from "@prisma/client"

export const { auth, signIn, signOut, handlers } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {},
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
                        roleId: true,
                        firstName: true,
                        password: true,
                    },
                })
                if (authorized) {
                    const isEquals = password === authorized.password
                    if (!isEquals) {
                        return null
                    }
                    const role = await prisma.role.findFirst({
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
                token.user = user as User
            }
            return token
        },
        async session({ session, token }) {
            /**
             * TODO: fix
             */
            if (token.user) {
                session.user = token.user as never
            }
            return session
        },
    },
})
