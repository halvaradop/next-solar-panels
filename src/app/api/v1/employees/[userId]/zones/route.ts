import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Zones } from "@prisma/client"
import { Params, ResponseAPI, ZoneRequest } from "@/lib/@types/types"
import { request } from "http"

/**
 * Handle the GET request to retrieve all zones related to a specific employee
 * in the database.
 *
 * @param request - The HTTP request data received with the employee ID.
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
        const data = await prisma.zones.findMany({
            where: {
                Samples: {
                    some: {
                        userId,
                    },
                },
            },
        })
        return NextResponse.json<ResponseAPI<Zones[]>>({
            data,
            ok: true,
        })
    } catch (error) {
        return NextResponse.json<ResponseAPI<Zones[]>>({ data: [], ok: true }, { status: 404 })
    }
}

export const POST = async (request: NextRequest): Promise<NextResponse> => {
    try {
        console.log("entro 1")
        const response = await request.json()
        const { latitude, longitude, name, plant } = response as ZoneRequest
        console.log(response)
        const newZone = await prisma.zones.create({
            data: {
                latitude,
                longitude,
                name,
                plantId: parseInt(plant),
            },
        })
        console.log("pasa")
        console.log(newZone)

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
