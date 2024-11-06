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
                const authorized = await prisma.employee.findUnique({
                    where: {
                        email,
                        password,
                    },
                })
                if (authorized) {
                    const role = await prisma.role.findUnique({
                        where: { id: authorized.idRole },
                        select: {
                            name: true,
                        },
                    })
                    const { email, name, id } = authorized
                    const jwt = { email, name, role: role?.name, id: id.toString() }
                    console.log("Auth: ", authorized, ", jwt: ", jwt)
                    return jwt
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
