import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Zones } from "@prisma/client"
import { ResponseAPI } from "@/lib/@types/types"

/**
 * Handle the GET request to retrieve all zones from the database.
 *
 * @returns {Promise<NextResponse>} - HTTP response with all zones.
 * @example
 * ```ts
 * const response = await fetch("/api/v1/zones")
 * const data = await response.json()
 * ```
 */
export const GET = async (): Promise<NextResponse> => {
    try {
        const data = await prisma.zones.findMany()
        return NextResponse.json<ResponseAPI<Zones[]>>({
            data,
            ok: true,
            message: "The resource was retrieved successfuly",
        })
    } catch (error) {
        return NextResponse.json<ResponseAPI<Zones[]>>(
            {
                data: [],
                ok: false,
                message: "Failed to retrieve zones",
            },
            { status: 404 }
        )
    }
}

/**
 * Handle the POST request to create a new zone associated with a specific plant in the database.
 *
 * @param {NextRequest} request - The HTTP request containing the information of the new zone.
 * @returns {Promise<NextResponse>} - HTTP response with the newly created zone.
 * @example
 * ```ts
 * const response = await fetch("/api/v1/zones", {
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
