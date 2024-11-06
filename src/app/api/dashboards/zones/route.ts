import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { ResponseAPI } from "@/lib/@types/types"
import { Zone } from "@prisma/client"

export const GET = async () => {
    try {
        const data = await prisma.zone.findMany()
        return NextResponse.json<ResponseAPI<Zone[]>>({
            data,
            ok: true,
        })
    } catch (error) {
        return NextResponse.json({ data: [], ok: false }, { status: 404 })
    }
}

export const POST = async (request: NextRequest) => {
    const { userId } = (await request.json()) as { userId: number }
    try {
        const data = await prisma.zone.findMany({
            where: {
                Plant: {
                    Employee: {
                        id: userId,
                    },
                },
            },
        })
        return NextResponse.json<ResponseAPI<Zone[]>>({
            data,
            ok: true,
        })
    } catch (error) {
        return NextResponse.json<ResponseAPI<Zone>>({ data: {} as Zone, ok: true }, { status: 404 })
    }
}
