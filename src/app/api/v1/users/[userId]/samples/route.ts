import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Sample } from "@prisma/client"
import { Params, ResponseAPI } from "@/lib/@types/types"
import { Decimal } from "@prisma/client/runtime/library"

/**
 * Handle the GET request to retrieve all samples related to a specific user
 * from the database.
 *
 * @param {NextRequest} request - The HTTP request object.
 * @param {Params<"userId">} params - The dynamic parameter to extract the `userId`.
 * @returns {Promise<NextResponse>} - HTTP response with the samples related to the user.
 * @example
 * ```ts
 * const response = await fetch("/api/v1/users/{userId}/samples")
 * const data = await response.json()
 * ```
 */
export const GET = async (request: NextRequest, { params }: Params<"userId">): Promise<NextResponse> => {
    try {
        const userId = params.userId
        const data = await prisma.sample.findMany({
            where: {
                userId,
            },
        })
        return NextResponse.json<ResponseAPI<Sample[]>>({ data, ok: true })
    } catch (error) {
        return NextResponse.json<ResponseAPI<Sample[]>>(
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
 * TODO: Create the new sample related to the user other than create it by zone.
 *
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
 *     userId: 1,
 *     zoneId: 1,
 *     soilTime: 1,
 *     soilResistivity: 1,
 *     moistureContent: 1,
 *     pHValue: 1,
 *     bufferCapacityPH4_3: 1,
 *     bufferCapacityPH7_0: 1,
 *     sulfurReducingBacteria: 1,
 *     sulfateContent: 1,
 *     neutralSalts: 1,
 *     undergroundWaterPresence: "never",
 *     horizontalSoilHomogeneity: 1,
 *     verticalSoilHomogeneity: 1,
 *     soilTypeHomogeneity: "homogeneous",
 *     pHSoilHomogeneity: 1,
 *     externalCathodes: 1,
 *   })
 * })
 * const data = await response.json()
 * ```
 */
export const POST = async (request: NextRequest): Promise<NextResponse> => {
    try {
        const response = await request.json()
        const json: Sample = response
        const keysB0 = [
            json.soilTime,
            json.soilResistivity,
            json.moistureContent,
            json.pHValue,
            json.bufferCapacityPH4_3,
            json.bufferCapacityPH7_0,
            json.sulfurReducingBacteria,
            json.sulfateContent,
            json.neutralSalts,
            json.undergroundWaterPresence,
        ]
        const keysB1 = [
            json.horizontalSoilHomogeneity,
            json.verticalSoilHomogeneity,
            json.soilTypeHomogeneity,
            json.pHSoilHomogeneity,
            json.externalCathodes,
        ]

        const b0 = keysB0.reduce((prev, now) => prev.add(now), new Decimal(0))
        const b1 = keysB1.reduce((prev, now) => prev.add(now), new Decimal(0))

        const data = await prisma.sample.create({
            data: {
                ...json,
                date: new Date(),
                b0: b0.toString(),
                b1: b1.toString(),
            },
        })
        if (!data) {
            return NextResponse.json<ResponseAPI<{}>>({
                data: {},
                ok: false,
                message: "Failed to create the new sample",
            })
        }

        return NextResponse.json<ResponseAPI<Sample>>({
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
