import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Field } from "@prisma/client"
import { Params, ResponseAPI } from "@/lib/@types/types"

/**
 * Handles the GET request to retrieve fields for a specific project.
 *
 * @param {NextRequest} request - The incoming request object.
 * @param {Params<"projectId">} params - The route parameters containing the project ID.
 * @returns {Promise<NextResponse>} - A promise that resolves to a JSON response containing the fields or an error message.
 *
 * @example
 * ```ts
 * const response = await fetch("{domain}/api/v1/projects/{projectId}/fields")
 * const data = await response.json()
 * ```
 */
export const GET = async (request: NextRequest, { params }: Params<"projectId">): Promise<NextResponse> => {
    try {
        const projectId = (await params).projectId
        const data = await prisma.field.findMany({
            where: {
                idProject: projectId,
            },
            include: {
                project: true,
                address: true,
            },
        })
        return NextResponse.json<ResponseAPI<Field[]>>({
            data,
            ok: true,
        })
    } catch (error) {
        return NextResponse.json<ResponseAPI<Field[]>>(
            {
                data: [],
                ok: false,
                message: "Failed to retrieve the data",
            },
            { status: 400 }
        )
    }
}
