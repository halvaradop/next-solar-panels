import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { ResponseAPI, SampleZone } from "@/lib/@types/types"

export const POST = async (request: NextRequest) => {
    const { userId } = (await request.json()) as { userId: number }
    try {
        const data = await prisma.sample.findMany({
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
        return NextResponse.json<ResponseAPI<SampleZone[]>>({ data, ok: true })
    } catch (error) {
        return NextResponse.json<ResponseAPI<SampleZone[]>>(
            {
                data: [],
                ok: false,
                message: "Error to retrieve the data",
            },
            { status: 404 }
        )
    }
}
