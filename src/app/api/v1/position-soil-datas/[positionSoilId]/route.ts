import { Params, ResponseAPI } from "@/lib/@types/types"
import { prisma } from "@/lib/prisma"
import { PositionSoilData } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

/**
 * Handles the GET request to retrieve specific position soil data by its ID from the database.
 *
 * @param {NextRequest} request - The HTTP request containing the request data.
 * @param {Params<"positionSoilId">} params - The dynamic parameter to extract the `positionSoilId`.
 * @returns {Promise<NextResponse>} - The HTTP response with the fetched position soil data.
 * @example
 * ```ts
 * const response = await fetch("/api/v1/position-soil-datas/{positionSoilId}");
 * const data = await response.json();
 * ```
 */
export const GET = async (request: NextRequest, { params }: Params<"positionSoilId">): Promise<NextResponse> => {
    try {
        const idPositionSoilData = (await params).positionSoilId
        const sample = await prisma.positionSoilData.findUnique({
            where: {
                idPositionSoilData,
            },
            include: {
                contactPerson: {
                    select: {
                        firstName: true,
                        lastName: true,
                    },
                },
            },
        })
        if (!sample) {
            return NextResponse.json<ResponseAPI<{}>>({
                data: {},
                ok: false,
                message: "No position soil data found for the provided ID.",
            })
        }
        return NextResponse.json<ResponseAPI<PositionSoilData>>({
            data: sample,
            ok: true,
            message: "Position soil data retrieved successfully.",
        })
    } catch {
        return NextResponse.json<ResponseAPI<{}>>(
            {
                data: {},
                ok: false,
                message: "An error occurred while retrieving the position soil data.",
            },
            { status: 400 }
        )
    }
}
