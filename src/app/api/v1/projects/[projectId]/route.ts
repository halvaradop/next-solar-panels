import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Params } from "@/lib/@types/types"

/**
 * Handle the GET request to retrieve the plant data related to a specific plantId
 *
 * @param {NextRequest} request - The HTTP request data containing request data
 * @param {Params<"plantId">} params - The dynamic parameter to extract the `plantId`.
 * @returns {Promise<NextResponse>} - HTTP response with the plant data.
 * @example
 * ```ts
 * const response = await fetch("/api/v1/proyect/1")
 * const data = await response.json()
 * ```
 */
export const GET = async (request: NextRequest, { params }: Params<"projectId">): Promise<NextResponse> => {
    try {
        const data = await prisma.project.findUnique({
            where: {
                projectId: params.projectId,
            },
        })
        return NextResponse.json({
            data,
            ok: true,
        })
    } catch (error) {
        return NextResponse.json(
            {
                data: [],
                ok: false,
                message: "Failed to retrieve the data",
            },
            { status: 404 }
        )
    }
}
