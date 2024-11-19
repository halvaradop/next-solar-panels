import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Project } from "@prisma/client"
import { Params, ResponseAPI } from "@/lib/@types/types"

/**
 * Handle the GET request to retrieve all plants related to a specific company
 *
 * @param {NextRequest} request - The HTTP request containing the request data.
 * @param {Params<"clientId">} params - The dynamic parameter to extract the `companyId`.
 * @returns {Promise<NextResponse>} - HTTP response with the plants related to the user.
 * @example
 * ```ts
 * const response = await fetch("/api/v1/companies/{companyId}/plants")
 * const data = await response.json()
 * ```
 */
export const GET = async (request: NextRequest, { params }: Params<"clientId">): Promise<NextResponse> => {
    try {
        const clientsId = params.clientId
        const data = await prisma.project.findMany({
            where: {
                clientsId,
            },
        })
        return NextResponse.json<ResponseAPI<unknown>>({
            data,
            ok: true,
        })
    } catch (error) {
        return NextResponse.json<ResponseAPI<Project[]>>(
            {
                data: [],
                ok: false,
                message: "Failed to retrieve the data",
            },
            { status: 404 }
        )
    }
}
