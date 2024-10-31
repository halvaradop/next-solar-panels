import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { auth, signIn, signOut, handlers } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                username: {},
                password: {},
            },
            async authorize(credentials) {
                return null
            },
        }),
    ],
})
