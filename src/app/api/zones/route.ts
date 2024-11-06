import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export const GET = async () => {
    try {
        const data = await prisma.zone.findMany()
        return NextResponse.json({
            data,
            ok: true,
        })
    } catch (error) {
        return NextResponse.json({ data: [], ok: false }, { status: 404 })
    }
}
