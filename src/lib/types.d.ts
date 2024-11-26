import { User as UserPrisma } from "@prisma/client"
import { DefaultSession, Session } from "next-auth"
import { DefaultJWT, JWT } from "next-auth/jwt"
import { MotionProps } from "framer-motion"

declare module "next-auth" {
    interface User extends DefaultSession["user"] {
        role?: string
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        user: UserPrisma
    }
}

declare module "framer-motion" {
    interface MotionProps {
        className?: string
    }
}
