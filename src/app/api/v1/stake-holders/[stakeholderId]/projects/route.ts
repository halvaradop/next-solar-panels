import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Project } from "@prisma/client"
import { Params, ResponseAPI } from "@/lib/@types/types"

/**
 * Handles the GET request to retrieve all projects related to a specific stakeholder.
 *
 * @param {NextRequest} request - The HTTP request containing the request data.
 * @param {Params<"stakeholderId">} params - The dynamic parameter to extract the `stakeholderId`.
 * @returns {Promise<NextResponse>} - HTTP response with the projects related to the stakeholder.
 * @example
 * ```ts
 * const response = await fetch("{domain}/api/v1/stakeholders/{stakeholderId}/projects");
 * const data = await response.json();
 * ```
 */
export const GET = async (request: NextRequest, { params }: Params<"stakeholderId">): Promise<NextResponse> => {
    try {
        const idStakeholder = (await params).stakeholderId
        const data = await prisma.project.findMany({
            where: {
                idStakeholder,
            },
            include: {
                address: true,
                contactPerson: true,
                stakeholder: true,
            },
        })
        return NextResponse.json<ResponseAPI<unknown>>({
            data,
            ok: true,
        })
    } catch {
        return NextResponse.json<ResponseAPI<Project[]>>(
            {
                data: [],
                ok: false,
                message: "Failed to retrieve the projects",
            },
            { status: 404 }
        )
    }
}
