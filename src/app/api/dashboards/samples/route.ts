import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export const POST = async (request: NextRequest) => {
    const { userId } = (await request.json()) as { userId: number }
    const data = await prisma.sample
        .findMany({
            where: {
                Zone: {
                    Plant: {
                        Employee: {
                            id: userId,
                        },
                    },
                },
            },
            include: {
                Zone: true,
            },
        })
        .catch(() => [])
    return NextResponse.json({ data, ok: true })
}
