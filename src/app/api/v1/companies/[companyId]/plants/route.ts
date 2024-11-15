import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Zones } from "@prisma/client"
import { Params, ResponseAPI } from "@/lib/@types/types"

/**
 * TODO: move this route to ??
 *
 * Handle the GET request to retrieve all zones related to a specific company
 * in the database.
 *
 * @param {NextRequest} request - The HTTP request containing the request data.
 * @param {Params<"companyId">} params - The dynamic parameter to extract the `companyId`.
 * @returns {Promise<NextResponse>} - HTTP response with the zones related to the user.
 * @example
 * ```ts
 * const response = await fetch("/api/v1/companies/{companyId}/plants")
 * const data = await response.json()
 * ```
 */
export const GET = async (request: NextRequest, { params }: Params<"companyId">): Promise<NextResponse> => {
    try {
        const companyId = parseInt(params.companyId)
        const data = await prisma.plants
            .findMany({
                where: {
                    companyId,
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
