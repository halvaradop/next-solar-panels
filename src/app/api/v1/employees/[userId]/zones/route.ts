import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Zones } from "@prisma/client"
import { Params, ResponseAPI } from "@/lib/@types/types"

/**
 * Handle the GET request to retrieve all zones related to a specific employee
 * in the database.
 *
 * @param {NextRequest} request - The HTTP request containing the request data.
 * @param {Params<"userId">} params - The dynamic parameter to extract the `userId`.
 * @returns {Promise<NextResponse>} - HTTP response with the zones related to the employee.
 * @example
 * ```ts
 * const response = await fetch("/api/v1/employees/{userId}/zones")
 * const data = await response.json()
 * ```
 */
export const GET = async (request: NextRequest, { params }: Params<"userId">): Promise<NextResponse> => {
    try {
        const userId = parseInt(params.userId)
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
        const data = await prisma.plants
            .findMany({
                where: {
                    companyId: company?.companyId,
                },
                include: {
                    Zones: true,
                },
            })
            .then((plants) => plants.flatMap((plant) => plant.Zones))
        return NextResponse.json<ResponseAPI<Zones[]>>({
            data,
            ok: true,
        })
    } catch (error) {
        return NextResponse.json<ResponseAPI<Zones[]>>({ data: [], ok: true }, { status: 404 })
    }
}

/**
 * Handle the POST request to create a new zone associated with a specific plant in the database.
 *
 * @param {NextRequest} request - The HTTP request containing the information of the new zone.
 * @returns {Promise<NextResponse>} - HTTP response with the newly created zone.
 * @example
 * ```ts
 * const response = await fetch("/api/v1/employees/{userId}/zones", {
 *   method: "POST",
 *   body: JSON.stringify({
 *     latitude: 40.7128,
 *     longitude: -74.0060,
 *     name: "New Zone",
 *     plant: "1"
 *   })
 * })
 * const data = await response.json()
 * ```
 */
export const POST = async (request: NextRequest): Promise<NextResponse> => {
    try {
        const response = await request.json()
        const { latitude, longitude, name, plant } = response
        const newZone = await prisma.zones.create({
            data: {
                latitude,
                longitude,
                name,
                plantId: parseInt(plant),
            },
        })
        return NextResponse.json<ResponseAPI<Zones>>({
            data: newZone as Zones,
            ok: true,
            message: "The zone was created successfuly",
        })
    } catch (error) {
        return NextResponse.json<ResponseAPI<{}>>({
            data: {},
            ok: false,
            message: "Failed to create new zone",
        })
    }
}
