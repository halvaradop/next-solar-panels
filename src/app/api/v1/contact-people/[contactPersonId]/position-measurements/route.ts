import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { PositionMeasurement } from "@prisma/client"
import { Params, ResponseAPI } from "@/lib/@types/types"

/**
 * Handle the GET request to retrieve all position soil data related to a specific contact person
 * from the database.
 *
 * @param {NextRequest} request - The HTTP request object.
 * @param {Params<"contactPersonId">} params - The dynamic parameter to extract the `contactPersonId`.
 * @returns {Promise<NextResponse>} - HTTP response with the position soil data related to the contact person.
 * @example
 * ```ts
 * const response = await fetch("/api/v1/contact-people/{contactPersonId}/position-measurements")
 * const data = await response.json()
 * ```
 */
export const GET = async (request: NextRequest, { params }: Params<"contactPersonId">): Promise<NextResponse> => {
    try {
        const idContactPerson = (await params).contactPersonId
        const data = await prisma.positionMeasurement.findMany({
            where: {
                idContactPerson,
            },
        })
        return NextResponse.json<ResponseAPI<PositionMeasurement[]>>({
            data,
            ok: true,
        })
    } catch (error) {
        return NextResponse.json<ResponseAPI<PositionMeasurement[]>>(
            {
                data: [],
                ok: false,
                message: "Failed to retrieve samples for the specified user",
            },
            { status: 400 }
        )
    }
}
