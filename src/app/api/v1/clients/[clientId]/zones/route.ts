import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Zone } from "@prisma/client"
import { Params, ResponseAPI } from "@/lib/@types/types"

/**
 * Handle the GET request to retrieve the zones related to a specific client
 * from the database.
 *
 * @param {NextRequest} request - The HTTP request containing the request data.
 * @param {Params<"clientId">} params - The dynamic parameter to extract the `clientId`.
 * @returns {Promise<NextResponse>} - HTTP response with the zones related to the client.
 * @example
 * ```ts
 * const response = await fetch("{domain}/api/v1/clients/{clientId}/zones")
 * const data = await response.json()
 * ```
 */
export const GET = async (request: NextRequest, { params }: Params<"clientId">): Promise<NextResponse> => {
    try {
        const clientsId = (await params).clientId
        const data = await prisma.zone.findMany({
            where: {
                project: {
                    clientsId,
                },
            },
            include: {
                project: true,
            },
        })
        return NextResponse.json<ResponseAPI<Zone[]>>({
            data,
            ok: true,
        })
    } catch (error) {
        return NextResponse.json<ResponseAPI<Zone[]>>(
            {
                data: [],
                ok: false,
                message: "Failed to retrieve the data",
            },
            { status: 404 }
        )
    }
}
