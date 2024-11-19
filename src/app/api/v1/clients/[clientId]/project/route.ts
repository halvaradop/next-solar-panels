import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Project } from "@prisma/client"
import { Params, ResponseAPI } from "@/lib/@types/types"

/**
 * Handle the GET request to retrieve all plants related to a specific client
 *
 * @param {NextRequest} request - The HTTP request containing the request data.
 * @param {Params<"clientId">} params - The dynamic parameter to extract the `clientId`.
 * @returns {Promise<NextResponse>} - HTTP response with the plants related to the user.
 * @example
 * ```ts
 * const response = await fetch("/api/v1/clients/{clientId}/plants")
 * const data = await response.json()
 * ```
 */
export const GET = async (request: NextRequest, { params }: Params<"clientId">): Promise<NextResponse> => {
    try {
        const clientsId = (await params).clientId
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
