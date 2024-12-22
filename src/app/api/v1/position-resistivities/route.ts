import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { PositionResistivity } from "@prisma/client"
import { ResponseAPI } from "@/lib/@types/types"

/**
 * Handler for the GET request to fetch position resistivities.
 *
 * @returns {Promise<NextResponse>} A promise that resolves to a NextResponse object containing the fetched position resistivities.
 *
 * @example
 * ```ts
 * const response = await fetch("{domain}/api/v1/position-resistivities")
 * const data = await response.json()
 * ```
 */
export const GET = async (): Promise<NextResponse> => {
    try {
        const data = await prisma.positionResistivity.findMany()
        return NextResponse.json<ResponseAPI<PositionResistivity[]>>({
            data,
            message: "Position resistivities fetched successfully",
            ok: true,
        })
    } catch {
        return NextResponse.json<ResponseAPI<PositionResistivity[]>>({
            data: [],
            message: "Failed to fetch position resistivities",
            ok: false,
        })
    }
}
