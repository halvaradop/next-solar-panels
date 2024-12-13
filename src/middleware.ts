import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { Roles } from "@/lib/@types/types"

export const roleBasedAccessControl: Record<Roles, string[]> = {
    admin: [
        "projects",
        "projects/add",
        "fields",
        "fields/add",
        "position-datas",
        "position-datas/add",
        "position-soil-datas",
        "position-soil-datas/add",
        "position-soil-datas2",
        "position-soil-datas2/add",
        "stake-holders",
        "stake-holders/add",
        "contact-people",
        "contact-people/add",
        "addresses",
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
