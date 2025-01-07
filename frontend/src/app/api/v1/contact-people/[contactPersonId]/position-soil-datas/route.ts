import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { PositionSoilData } from "@prisma/client"
import { ResponseAPI } from "@/lib/@types/types"
import { sampleCalcs } from "@/lib/math"

/**
 * Handle the POST request to create a new sample related to a specific user
 * in the database.
 *
 * @param {NextRequest} request - The HTTP request data received with the new sample information.
 * @returns {Promise<NextResponse>} - HTTP response with the new sample created.
 * @example
 * ```ts
 * const response = await fetch("/api/v1/users/{userId}/samples", {
 *   method: "POST",
 *   body: JSON.stringify({
 *
 *   })
 * })
 * const data = await response.json()
 * ```
 */
export const POST = async (request: NextRequest): Promise<NextResponse> => {
    try {
        const { idContactPerson, ...rest } = await request.json()

        const { b0, b1 } = sampleCalcs(rest)
        const data = await prisma.positionSoilData.create({
            data: {
                idContactPerson: idContactPerson,
                ...rest,
                date: new Date(),
                updateAt: new Date(),
                b0,
                b1,
            },
        })
        if (!data) {
            return NextResponse.json<ResponseAPI<{}>>({
                data: {},
                ok: false,
                message: "Failed to create the new sample",
            })
        }

        return NextResponse.json<ResponseAPI<PositionSoilData>>({
            data,
            ok: true,
            message: "The resource was created successfuly",
        })
    } catch {
        return NextResponse.json<ResponseAPI<{}>>({
            data: {},
            ok: false,
            message: "Failed to create the new sample",
        })
    }
}
