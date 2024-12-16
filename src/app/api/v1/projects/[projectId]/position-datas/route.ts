import { Params, ResponseAPI } from "@/lib/@types/types"
import { prisma } from "@/lib/prisma"
import { PositionData } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

/**
 * Handles the GET request to retrieve position data for a specific project.
 *
 * @param {NextRequest} request - The incoming request object.
 * @param {Params<"projectId">} params - The route parameters containing the project ID.
 * @returns {Promise<NextResponse>} - A promise that resolves to a JSON response containing the position data or an error message.
 *
 * @example
 * ```ts
 * const response = await fetch("{domain}/api/v1/projects/{projectId}/position-datas")
 * const data = await response.json()
 * ```
 */
export const GET = async (request: NextRequest, { params }: Params<"projectId">): Promise<NextResponse> => {
    try {
        const idProject = (await params).projectId
        const data = await prisma.positionData.findMany({
            where: {
                field: {
                    idProject,
                },
            },
        })
        return NextResponse.json<ResponseAPI<PositionData[]>>({
            data,
            ok: true,
        })
    } catch (error) {
        return NextResponse.json<ResponseAPI<PositionData[]>>(
            {
                data: [],
                ok: false,
                message: "Failed to retrieve the data",
            },
            { status: 400 }
        )
    }
}
