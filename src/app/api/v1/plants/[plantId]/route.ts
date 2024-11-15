import { NextRequest, NextResponse } from "next/server"
import { Params } from "@/lib/@types/types"
import { prisma } from "@/lib/prisma"

export const GET = async (request: NextRequest, { params }: Params<"plantId">): Promise<NextResponse> => {
    try {
        const data = await prisma.plants.findUnique({
            where: {
                plantId: parseInt(params.plantId),
            },
        })
        return NextResponse.json({
            data,
            ok: true,
        })
    } catch (error) {
        return NextResponse.json(
            {
                data: [],
                ok: false,
                message: "Failed to retrieve the data",
            },
            { status: 404 }
        )
    }
}
