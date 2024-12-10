import { NextRequest, NextResponse } from "next/server"
import { Params, ResponseAPI } from "@/lib/@types/types"
import { prisma } from "@/lib/prisma"
import { PositionData } from "@prisma/client"

export const GET = async (request: NextRequest, { params }: Params<"stakeholderId">) => {
    try {
        const idStakeholder = (await params).stakeholderId
        const data = await prisma.positionData.findMany({
            where: {
                field: {
                    project: {
                        idStakeholder,
                    },
                },
            },
        })
        return NextResponse.json<ResponseAPI<PositionData[]>>({
            data,
            message: "Stakeholder position data retrieved successfully",
            ok: true,
        })
    } catch (error) {
        return NextResponse.json<ResponseAPI<null>>({
            data: null,
            message: "Error to retrieve stakeholder position data",
            ok: false,
        })
    }
}
