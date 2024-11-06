import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (request: NextRequest) => {
    const { userId } = (await request.json()) as { userId: number }
    const data = await prisma.zone.findMany({
        where: {
            Plant: {
                Employee: {
                    id: userId,
                },
            },
        },
    })
    return NextResponse.json({ data, ok: true })
}
