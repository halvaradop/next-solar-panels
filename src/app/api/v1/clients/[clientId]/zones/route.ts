import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Zone } from "@prisma/client"
import { Params, ResponseAPI } from "@/lib/@types/types"

/**
 * Handle the GET request to retrieve the zones related to a specific company
 * in the database.
 *
 * @param {NextRequest} request - The HTTP request containing the request data.
 * @param {Params<"clientId">} params - The dynamic parameter to extract the `companyId`.
 * @returns {Promise<NextResponse>} - HTTP response with the zones related to the users.
 * @example
 * ```ts
 * const response = await fetch("/api/v1/companies/{companyId}/zones")
 * const data = await response.json()
 * ```
 */
export const GET = async (request: NextRequest, { params }: Params<"clientId">): Promise<NextResponse> => {
    try {
        const clientsId = params.clientId
        const data = await prisma.zone.findMany({
            where: {
                project: {
                    clientsId,
                },
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
