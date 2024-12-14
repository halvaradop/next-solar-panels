import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { PositionMeasurement } from "@prisma/client"
import { ResponseAPI } from "@/lib/@types/types"

/**
 * Handler for the GET request to fetch position measurements.
 *
 * @returns {Promise<NextResponse>} A promise that resolves to a NextResponse object containing the fetched position measurements.
 *
 * @example
 * ```ts
 * const response = await fetch("{domain}/api/v1/position-measurements")
 * const data = await response.json()
 * ```
 */
export const GET = async (): Promise<NextResponse> => {
    try {
        const data = await prisma.positionMeasurement.findMany()
        return NextResponse.json<ResponseAPI<PositionMeasurement[]>>({
            data,
            message: "Position measurements fetched successfully",
            ok: true,
        })
    } catch (error) {
        return NextResponse.json<ResponseAPI<PositionMeasurement[]>>({
            data: [],
            message: "Failed to fetch position measurements",
            ok: false,
        })
    }
}
