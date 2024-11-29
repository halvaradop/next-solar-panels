import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { Roles } from "@/lib/@types/types"

export const roleBasedAccessControl: Record<Roles, string[]> = {
    "client-admin": [
        "samples",
        "samples/add",
        "zones",
        "zones/add",
        "users",
        "users/add",
        "clients",
        "clients/add",
        "projects",
        "projects/add",
        "users-on-projects",
        "users-on-projects/add",
    ],
    "internal-employee": ["samples", "zones", "users", "clients", "projects", "users-on-projects"],
    user: ["samples", "zones", "projects"],
    "user-employee": ["samples"],
}

/**
 * Middleware to check if the user is authenticated. If not, redirect to the login page.
 * There are four roles:
 * - `client-admin`
 * - `internal-employee`
 * - `user`
 * - `user-employee`
 */
export const middleware = async (request: NextRequest) => {
    const session = await auth()
    if (!session) {
        return NextResponse.redirect(new URL("/login", request.nextUrl))
    }
    const rbac = roleBasedAccessControl[session.user.role] ?? []
    const pathname = request.nextUrl.pathname.replace(/^\/dashboard\/?/, "")
    if (!rbac.includes(pathname) && pathname !== "") {
        return NextResponse.redirect(new URL("/dashboard", request.nextUrl))
    }
    return NextResponse.next()
}

export const config = {
    matcher: ["/dashboard", "/dashboard/:path*"],
}
