import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { PositionSoilData } from "@prisma/client"
import { ResponseAPI } from "@/lib/@types/types"

/**
 * Handles the GET request to retrieve all position soil data measurements from the database.
 *
 * @returns {Promise<NextResponse>} - HTTP response containing all position soil data measurements.
 * @example
 * ```ts
 * const response = await fetch("{domain}/api/v1/position-soil-datas");
 * const data = await response.json();
 * ```
 */
export const GET = async (): Promise<NextResponse> => {
    try {
        const data = await prisma.positionSoilData.findMany()
        return NextResponse.json<ResponseAPI<PositionSoilData[]>>({
            data,
            ok: true,
            message: "The resource was retrieved successfuly",
        })
    } catch {
        return NextResponse.json<ResponseAPI<PositionSoilData[]>>(
            {
                data: [],
                ok: false,
                message: "Failed to retrieve the position soil data measurements.",
            },
            { status: 400 }
        )
    }
}
