/* eslint-disable @typescript-eslint/no-unused-vars */
import { DefaultSession, Session } from "next-auth"
import { DefaultJWT, JWT } from "next-auth/jwt"
import { MotionProps } from "framer-motion"
import { AdapterUser } from "next-auth/adapters"
import { Roles } from "@/lib/@types/types"

declare module "next-auth" {
    interface User extends Omit<DefaultSession["user"], "name"> {
        role: Roles
        firstName?: string
        lastName?: string
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
