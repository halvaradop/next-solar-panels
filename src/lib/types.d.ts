import { DefaultSession, Session } from "next-auth"
import { DefaultJWT, JWT } from "next-auth/jwt"
declare module "next-auth" {
    interface User extends DefaultSession["user"] {
        role?: string
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        user: User
    }
}
