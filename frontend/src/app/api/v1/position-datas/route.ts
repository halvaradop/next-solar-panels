import { ResponseAPI } from "@/lib/@types/types"
import { PositionData } from "@/lib/@types/models"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (request: NextRequest): Promise<NextResponse> => {
    try {
        const response = await request.json()
        const { field, grounding, ...rest } = response
        const groundingBoolean = !!grounding

        // @ts-expect-error
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
    } catch {
        return NextResponse.json<ResponseAPI<{}>>({
            data: {},
            ok: false,
            message: "Failed to create new position data",
        })
    }
}
