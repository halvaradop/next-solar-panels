import { Params, ResponseAPI } from "@/lib/@types/types"
import { prisma } from "@/lib/prisma"
import { PositionData } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (request: NextRequest, { params }: Params<"idField">): Promise<NextResponse> => {
    const idField = (await params).idField
    try {
        const data = await prisma.positionData.findMany({
            where: {
                idField,
            },
            include: {
                field: true,
            },
        })
        return NextResponse.json<ResponseAPI<PositionData[]>>({
            data,
            message: "Successfully retrieved projects for the specified user",
            ok: true,
        })
    } catch (error) {
        return NextResponse.json<ResponseAPI<{}>>(
            {
                data: {},
                ok: false,
                message: "Failed to retrieve samples for the specified user",
            },
            { status: 400 }
        )
    }
}
