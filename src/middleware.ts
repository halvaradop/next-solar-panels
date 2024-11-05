import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"

export const middleware = async (request: NextRequest) => {
    const session = await auth()
    if (!session) NextResponse.redirect(new URL("/login", request.nextUrl))
    return NextResponse.next()
}

export const config = {
    matcher: ["/dashboard", "/dashboard/:path*"],
}
