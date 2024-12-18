import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { Roles } from "@/lib/@types/types"

export const roleBasedAccessControl: Record<Roles, string[]> = {
    admin: [
        "projects",
        "fields",
        "fields/:id",
        "position-datas",
        "position-datas/:id",
        "position-soil-datas",
        "stake-holders",
        "contact-people",
        "addresses/add",
    ],
    "client-admin": [
        "projects",
        "position-soil-datas",
        "contact-people",
        "projects",
        "fields",
        "fields/:id",
        "position-datas",
        "position-datas/:id",
        "help",
        "settings",
        "client-data",
    ],
    "project-manager": ["projects", "fields", "position-datas", "position-soil-datas"],
    "client-user": ["projects", "fields", "position-soil-datas"],
}

/**
 * Middleware to check if the user is authenticated. If not, redirect to the login page.
 * There are four roles:
 * - `admin`
 * - `client-admin`
 * - `client-user`
 * - `project-manager`
 */
export const middleware = async (request: NextRequest) => {
    const session = await auth()
    if (!session) {
        return NextResponse.redirect(new URL("/login", request.nextUrl))
    }
    const pathname = request.nextUrl.pathname
    const rbac = roleBasedAccessControl[session.user.role] ?? []
    const access = rbac.some((path) =>
        new RegExp(`^/dashboard/${path.replace(/:[a-zA-Z]+/g, "[^/]+")}$|^/dashboard$`).test(pathname)
    )
    if (!access) {
        return NextResponse.redirect(new URL("/dashboard", request.nextUrl))
    }
    return NextResponse.next()
}

export const config = {
    matcher: ["/dashboard", "/dashboard/:path*"],
}
