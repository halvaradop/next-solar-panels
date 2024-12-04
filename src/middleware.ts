import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { Roles } from "@/lib/@types/types"

export const roleBasedAccessControl: Record<Roles, string[]> = {
    "client-admin": [
        "samples",
        "samples/[sampleId]",
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
        "users on projects",
    ],
    "internal-employee": ["samples", "zones", "users", "clients", "projects", "users-on-projects", "users on projects"],
    user: ["samples", "samples/add", "samples/[sampleId]", "zones", "zones/add", "projects", "projects/add"],
    "user-employee": ["samples", "samples/add", "samples/[sampleId]"],
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
    if (pathname.startsWith("samples/") && pathname.split("/").length === 2 && rbac.includes("samples/[sampleId]")) {
        return NextResponse.next()
    }
    if (!rbac.includes(pathname) && pathname !== "") {
        return NextResponse.redirect(new URL("/dashboard", request.nextUrl))
    }
    return NextResponse.next()
}

export const config = {
    matcher: ["/dashboard", "/dashboard/:path*"],
}
