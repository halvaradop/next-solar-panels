import { NextResponse } from "next/server"
import { auth } from "./lib/auth"

export const middleware = async () => {
    const session = await auth()
    if (!session) NextResponse.redirect("/login")
    return NextResponse.next()
}

export const config = {
    matcher: ["/dashboard", "/dashboard/:path*"],
}
