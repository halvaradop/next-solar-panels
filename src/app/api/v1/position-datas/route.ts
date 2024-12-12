import { ResponseAPI } from "@/lib/@types/types"
import { prisma } from "@/lib/prisma"
import { PositionData } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (request: NextRequest): Promise<NextResponse> => {
    try {
        const response = await request.json()
        const { field, grounding, ...rest } = response
        const groundingBoolean = !!grounding
        console.log(grounding)
        console.log(groundingBoolean)
        const newPositionData = await prisma.positionData.create({
            data: {
                idField: field,
                grounding: groundingBoolean,
                ...rest,
            },
        })

        return NextResponse.json<ResponseAPI<PositionData>>({
            data: newPositionData,
            ok: true,
            message: "The Posistion data was create succesfully",
        })
    } catch (error) {
        return NextResponse.json<ResponseAPI<{}>>({
            data: {},
            ok: false,
            message: "Failed to create new position data",
        })
    }
}
