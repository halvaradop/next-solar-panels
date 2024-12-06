import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Zone } from "@prisma/client"
import { ResponseAPI } from "@/lib/@types/types"

/**
 * Handle the GET request to retrieve all zones from the database.
 *
 * @returns {Promise<NextResponse>} - HTTP response containing all zones.
 * @example
 * ```ts
 * const response = await fetch("{domain}/api/v1/zones")
 * const data = await response.json()
 * ```
 */
export const GET = async (): Promise<NextResponse> => {
    try {
        const data = await prisma.zone.findMany()
        return NextResponse.json<ResponseAPI<Zone[]>>({
            data,
            ok: true,
            message: "The resource was retrieved successfuly",
        })
    } catch (error) {
        return NextResponse.json<ResponseAPI<Zone[]>>(
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
 * Handle the POST request to create a new zone in the database.
 *
 * @param {NextRequest} request - The HTTP request containing the information of the new zone.
 * @returns {Promise<NextResponse>} - HTTP response with the newly created zone.
 * @example
 * ```ts
 * const response = await fetch("{domain}/api/v1/zones", {
 *   method: "POST",
 *   body: JSON.stringify({
 *     latitude: 40.7128,
 *     longitude: -74.0060,
 *     name: "New Zone",
 *     project: "1"
 *   })
 * })
 * const data = await response.json()
 * ```
 */
export const POST = async (request: NextRequest): Promise<NextResponse> => {
    try {
        const response = await request.json()
        const { latitude, longitude, name, project } = response

        const existName = await prisma.zone.findFirst({
            where: {
               name
            },
        })

        if (existName) {
            return NextResponse.json<ResponseAPI<{}>>({
                data: {},
                ok: false,
                message: "This name is assigned to another zone",
            })
        }

        const existcoordinates = await prisma.zone.findFirst({
            where: {
                latitude,
                longitude,
            },
        })

        if (existcoordinates) {
            return NextResponse.json<ResponseAPI<{}>>({
                data: {},
                ok: false,
                message: "A zone with the specified coordinates already exists.",
            })
        }
        const newZone = await prisma.zone.create({
            data: {
                latitude,
                longitude,
                name,
                projectId: project,
            },
        })
        return NextResponse.json<ResponseAPI<Zone>>({
            data: newZone as Zone,
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
