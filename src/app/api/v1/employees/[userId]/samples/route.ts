import { NextRequest, NextResponse } from "next/server"
import { revalidateTag } from "next/cache"
import { prisma } from "@/lib/prisma"
import { Sample } from "@prisma/client"
import { Params, ResponseAPI, SampleRequest, SampleZone } from "@/lib/@types/types"

/**
 * Handle the GET request to retrieve all samples related to a specific employee
 * in the database.
 *
 * @param {NextRequest} request - The HTTP request data received with the employee ID.
 * @returns {Promise<NextResponse>} - HTTP response with the samples related to the employee.
 * @example
 * ```ts
 * const response = await fetch("/api/v1/employees/{userId}/samples")
 * const data = await response.json()
 * ```
 */
export const GET = async (request: NextRequest, { params }: Params<"userId">): Promise<NextResponse> => {
    try {
        const userId = parseInt(params.userId)
        const data = await prisma.sample.findMany({
            where: {
                Zone: {
                    Plant: {
                        Employee: {
                            id: userId,
                        },
                    },
                },
            },
            include: {
                Zone: true,
            },
        })
        return NextResponse.json<ResponseAPI<SampleZone[]>>({ data, ok: true })
    } catch (error) {
        return NextResponse.json<ResponseAPI<SampleZone[]>>(
            {
                data: [],
                ok: false,
                message: "Failed to retrieve samples related to the employee",
            },
            { status: 404 }
        )
    }
}

/**
 * TODO: Create the new sample related to the employee other than create it by zone.
 *
 * Handle the POST request to create a new sample related to a specific employee
 * in the database.
 *
 * @param {NextRequest} request - The HTTP request data received with the new sample information.
 * @returns {Promise<NextResponse>} - HTTP response with the new sample created.
 * @example
 * ```ts
 * const response = await fetch("/api/v1/employees/{userId}/samples", {
 *   method: "POST",
 *   body: JSON.stringify({
 *     material: "Steel",
 *     corrosion: "30",
 *     humidity: "50",
 *     temperature: "25",
 *     zone: "1",
 *   })
 * })
 * const data = await response.json()
 * ```
 */
export const POST = async (request: NextRequest, { params }: Params<"userId">): Promise<NextResponse> => {
    try {
        const response = await request.json()
        const { material, corrosion, humidity, temperature, zone } = response as SampleRequest

        const newSample = await prisma.sample.create({
            data: {
                corrosion: corrosion,
                humidity: parseInt(humidity),
                material: material,
                temperature: parseInt(temperature),
                Zone: {
                    connect: {
                        id: parseInt(zone),
                    },
                },
            },
        })

        revalidateTag("samplesByUser")
        return NextResponse.json<ResponseAPI<Sample>>({
            data: newSample,
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