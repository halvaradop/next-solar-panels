import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { PositionSoilData } from "@prisma/client"
import { Params, ResponseAPI } from "@/lib/@types/types"
import { sampleCalcs } from "@/lib/utils"

/**
 * Handle the GET request to retrieve all position soil data related to a specific contact person
 * from the database.
 *
 * @param {NextRequest} request - The HTTP request object.
 * @param {Params<"contactPersonId">} params - The dynamic parameter to extract the `contactPersonId`.
 * @returns {Promise<NextResponse>} - HTTP response with the position soil data related to the contact person.
 * @example
 * ```ts
 * const response = await fetch("/api/v1/contact-people/{contactPersonId}/position-soil-datas")
 * const data = await response.json()
 * ```
 */
export const GET = async (request: NextRequest, { params }: Params<"contactPersonId">): Promise<NextResponse> => {
    try {
        const idContactPerson = (await params).contactPersonId
        const data = await prisma.positionSoilData.findMany({
            where: {
                idContactPerson,
            },
            select: {
                linkage: {
                    select: {
                        field: true,
                    },
                },
            },
        })
        return NextResponse.json<ResponseAPI<PositionSoilData[]>>({
            data: data as unknown as PositionSoilData[],
            ok: true,
        })
    } catch (error) {
        return NextResponse.json<ResponseAPI<PositionSoilData[]>>(
            {
                data: [],
                ok: false,
                message: "Failed to retrieve samples for the specified user",
            },
            { status: 500 }
        )
    }
}

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
        const response = await request.json()
        const json = response
        const { b0, b1 } = sampleCalcs(json)
        const data = await prisma.positionSoilData.create({
            data: {
                ...json,
                date: new Date(),
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
    } catch (error) {
        return NextResponse.json<ResponseAPI<{}>>({
            data: {},
            ok: false,
            message: "Failed to create the new sample",
        })
    }
}
