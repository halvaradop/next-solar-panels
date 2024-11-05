import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { prisma } from "@/prisma"

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
                    })
                    const { email, name } = authorized
                    return { email, name, role }
                }
                return null
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user }
        },
        async session({ session }) {
            return { ...session }
        },
    },
})
