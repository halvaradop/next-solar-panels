import { DefaultSession, Session } from "next-auth"
import { DefaultJWT, JWT } from "next-auth/jwt"
import { MotionProps } from "framer-motion"
import { AdapterUser } from "next-auth/adapters"

declare module "next-auth" {
    interface User extends DefaultSession["user"] {
        role?: string
    }

    interface Session extends DefaultSession {
        user: User
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        user: User
    }
}

declare module "framer-motion" {
    interface MotionProps {
        className?: string
    }
}
