import { ResponseAPI } from "@/lib/@types/types"
import { prisma } from "@/lib/prisma"
import { PositionData } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (request: NextRequest): Promise<NextResponse> => {
    try {
        const response = await request.json()
        const { field, grounding, ...rest } = response
        const groundingBoolean = !!grounding
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

/**
 * Handler for the GET request to fetch position datas.
 *
 * @returns {Promise<NextResponse>} A promise that resolves to a NextResponse object containing the fetched position datas.
 *
 * @example
 * ```ts
 * const response = await fetch("{domain}/api/v1/position-datas")
 * const data = await response.json()
 * ```
 */
export const GET = async (): Promise<NextResponse> => {
    try {
        const positionDatas = await prisma.positionData.findMany()
        return NextResponse.json<ResponseAPI<PositionData[]>>({
            data: positionDatas,
            ok: true,
            message: "All position datas",
        })
    } catch {
        return NextResponse.json<ResponseAPI<[]>>({
            data: [],
            ok: false,
            message: "Failed to fetch position datas",
        })
    }
}
