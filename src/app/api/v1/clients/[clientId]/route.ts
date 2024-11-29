import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Project, ProjectsOnUsers, User } from "@prisma/client"
import { Params, ResponseAPI } from "@/lib/@types/types"

/**
 * TODO: move this logic to the right place - in this route should get data relationed with the client
 * with the specific id
 *
 * Handles the GET request to retrieve all users associated with projects for a specific client.
 *
 * @param {NextRequest} request - The HTTP request object.
 * @param {Params<"clientId">} param1 - The route parameters containing the clientId.
 * @returns {Promise<NextResponse>} - The response containing the users and projects data.
 *
 * @example
 * ```ts
 * const response = await fetch("{domain}/api/v1/clients/{clientId}")
 * const data = await response.json()
 * ```
 */
export const GET = async (request: NextRequest, { params }: Params<"clientId">): Promise<NextResponse> => {
    try {
        const clientsId = (await params).clientId
        const data = await prisma.projectsOnUsers.findMany({
            where: {
                project: {
                    clientsId,
                },
            },
            select: {
                user: true,
                project: true,
            },
        })
        return NextResponse.json<ResponseAPI<(User & Project)[]>>({
            data: data as never,
            ok: true,
        })
    } catch (error) {
        return NextResponse.json<ResponseAPI<ProjectsOnUsers[]>>(
            {
                data: [],
                ok: false,
                message: "Failed to retrieve the users",
            },
            { status: 404 }
        )
    }
}
