import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Params } from "@/lib/@types/types"

/**
 * Handle the GET request to retrieve the project data related to a specific projectId.
 *
 * @param {NextRequest} request - The HTTP request object.
 * @param {Params<"projectId">} params - The dynamic parameter to extract the `projectId`.
 * @returns {Promise<NextResponse>} - HTTP response with the project data.
 * @example
 * ```ts
 * const response = await fetch("{domain}/api/v1/projects/{projectId}");
 * const data = await response.json();
 * ```
 */
export const GET = async (request: NextRequest, { params }: Params<"projectId">): Promise<NextResponse> => {
    try {
        const idProject = (await params).projectId

        const data = await prisma.project.findUnique({
            where: {
                idProject,
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
