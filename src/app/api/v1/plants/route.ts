import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Plants } from "@prisma/client"
import { ResponseAPI } from "@/lib/@types/types"

/**
 * Handles the GET request to retrieve all plants from the database.
 *
 * @returns {Promise<NextResponse>} - The HTTP response containing the plants
 * retrieved from the database.
 * @example
 * ```ts
 * const response = await fetch("/api/v1/plants")
 * const data = await response.json()
 * ```
 */
export const GET = async (): Promise<NextResponse> => {
    try {
        const data = await prisma.plants.findMany()
        return NextResponse.json<ResponseAPI<Plants[]>>({
            data,
            ok: true,
            message: "The resource was retrieved successfully",
        })
    } catch (error) {
        return NextResponse.json<ResponseAPI<Plants[]>>(
            {
                data: [],
                ok: false,
                message: "Failed to retrieve the plants",
            },
            { status: 500 }
        )
    }
}

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
        if (!id) {
            return NextResponse.json<ResponseAPI<{}>>({
                data: {},
                ok: false,
                message: "user id was not sent",
            })
        }
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
                                userId,
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
                UserPlants: {
                    create: {
                        userId,
                    },
                },
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
