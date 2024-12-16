import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { Roles } from "@/lib/@types/types"

export const roleBasedAccessControl: Record<Roles, string[]> = {
    admin: [
        "projects",
        "projects/add",
        "fields",
        "fields/add",
        "fields/:id",
        "position-datas",
        "position-datas/add",
        "position-datas/:id",
        "position-soil-datas",
        "position-soil-datas/add",
        "stake-holders",
        "stake-holders/add",
        "contact-people",
        "contact-people/add",
        "addresses/add",
    ],
    "client-admin": [
        "projects",
        "projects/add",
        "fields",
        "fields/add",
        "position-datas",
        "position-datas/add",
        "position-soil-datas",
        "position-soil-datas/add",
        "contact-people",
        "contact-people/add",
        "addresses",
    ],
    "project-manager": [
        "projects",
        "projects/add",
        "fields",
        "fields/add",
        "position-datas",
        "position-datas/add",
        "position-soil-datas",
        "position-soil-datas/add",
    ],
    "client-user": ["projects", "fields", "position-soil-datas", "position-soil-datas/add"],
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
