import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Plants } from "@prisma/client"
import { Params, ResponseAPI } from "@/lib/@types/types"

/**
 * Handle the POST request to create a new plant related to a specific user
 *
 * @param {NextRequest} request - The HTTP request data received with the new plant information.
 * @returns {Promise<NextResponse>} - HTTP response with the new plant created.
 * @example
 * ```ts
 * const response = await fetch("/api/v1/users/{userId}/plants", {
 *   method: "POST",
 *   body: JSON.stringify({
 *     plantName: "Plant Name",
 *     latitude: 1,
 *     longitude: 1,
 *   }),
 * })
 * const data = await response.json()
 * ```
 */
export const POST = async (request: NextRequest): Promise<NextResponse> => {
    try {
        const response = await request.json()
        const { plantName, latitude, longitude, id } = response
        const userId = parseInt(id)

        const existcoordinates = await prisma.plants.findFirst({
            where: {
                latitude,
                longitude,
            },
        })

        if (existcoordinates) {
            return NextResponse.json<ResponseAPI<{}>>({
                data: {},
                ok: false,
                message: "A plant with the specified coordinates already exists.",
            })
        }
        const company = await prisma.companies.findFirst({
            where: {
                Plants: {
                    some: {
                        UserPlants: {
                            some: {
                                userId: userId,
                            },
                        },
                    },
                },
            },
        })
        const data = await prisma.plants.create({
            data: {
                plantName,
                companyId: company?.companyId ?? 0,
                latitude,
                longitude,
            },
        })

        return NextResponse.json<ResponseAPI<Plants>>({
            data,
            ok: true,
            message: "The resource was created successfuly",
        })
    } catch (error) {
        return NextResponse.json<ResponseAPI<{}>>(
            {
                data: {},
                ok: false,
                message: "Failed to create the plant",
            },
            { status: 500 }
        )
    }
}

/**
 * Handle the GET request to retrieve all plants related to a specific user
 *
 * @param {NextRequest} request - The HTTP request containing the request data.
 * @param {Params<"userId">} params - The dynamic parameter to extract the `userId`.
 * @returns {Promise<NextResponse>} - HTTP response with the plants related to the user.
 * @example
 * ```ts
 * const response = await fetch("/api/v1/users/{userId}/plants")
 * const data = await response.json()
 * ```
 */
export const GET = async (request: NextRequest, { params }: Params<"userId">): Promise<NextResponse> => {
    try {
        const userId = parseInt(params.userId)
        const data = await prisma.companies
            .findMany({
                where: {
                    Plants: {
                        some: {
                            UserPlants: {
                                some: {
                                    userId: userId,
                                },
                            },
                        },
                    },
                },
                include: {
                    Plants: true,
                },
            })
            .then((companies) => companies.flatMap((companies) => companies.Plants))
        return NextResponse.json<ResponseAPI<Plants[]>>({
            data,
            ok: true,
        })
    } catch (error) {
        return NextResponse.json<ResponseAPI<Plants[]>>(
            {
                data: [],
                ok: false,
                message: "Failed to retrieve the data",
            },
            { status: 404 }
        )
    }
}
