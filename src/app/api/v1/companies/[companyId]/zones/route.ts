import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Zones } from "@prisma/client"
import { Params, ResponseAPI } from "@/lib/@types/types"

/**
 * Handle the GET request to retrieve the zones related to a specific company
 * in the database.
 *
 * @param {NextRequest} request - The HTTP request containing the request data.
 * @param {Params<"companyId">} params - The dynamic parameter to extract the `companyId`.
 * @returns {Promise<NextResponse>} - HTTP response with the zones related to the users.
 * @example
 * ```ts
 * const response = await fetch("/api/v1/companies/{companyId}/zones")
 * const data = await response.json()
 * ```
 */
export const GET = async (request: NextRequest, { params }: Params<"companyId">): Promise<NextResponse> => {
    try {
        const companyId = parseInt(params.companyId)
        const data = await prisma.zones.findMany({
            where: {
                plant: {
                    companyId,
                },
            },
        })
        return NextResponse.json<ResponseAPI<Zones[]>>({
            data,
            ok: true,
        })
    } catch (error) {
        return NextResponse.json<ResponseAPI<Zones[]>>(
            {
                data: [],
                ok: false,
                message: "Failed to retrieve the data",
            },
            { status: 404 }
        )
    }
}