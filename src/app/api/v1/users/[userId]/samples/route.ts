import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Samples } from "@prisma/client"
import { Params, ResponseAPI } from "@/lib/@types/types"

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
        const userId = parseInt(params.userId)
        const data = await prisma.samples.findMany({
            where: {
                userId,
            },
        })
        return NextResponse.json<ResponseAPI<Samples[]>>({ data, ok: true })
    } catch (error) {
        return NextResponse.json<ResponseAPI<Samples[]>>(
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
        const json: Samples = response
        const data = await prisma.samples.create({
            data: {
                ...json,
                sampleDateTime: new Date(),
            },
        })
        return NextResponse.json<ResponseAPI<Samples>>({
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
