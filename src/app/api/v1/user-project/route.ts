import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { ProjectsOnUsers } from "@prisma/client"
import { ResponseAPI } from "@/lib/@types/types"

/**
 * Handles the POST request to assign a plant to a user.
 *
 * @param {NextRequest} request - The HTTP request containing the user and plant IDs.
 * @returns {Promise<NextResponse>} - HTTP response containing the created ProjectsOnUsers record or an error message.
 * @example
 * ```ts
 * const response = await fetch("{domain}/api/v1/user-project", {
 *   method: "POST",
 *   body: JSON.stringify({ user: 1, plant: 1 }),
 * })
 * ```
 */
export const POST = async (request: NextRequest): Promise<NextResponse> => {
    try {
        const response = await request.json()
        const { user, plant } = response
        const userId = user
        const projectId = plant
        const existUser = await prisma.projectsOnUsers.findFirst({
            where: {
                projectId,
                userId,
            },
        })

        if (existUser) {
            return NextResponse.json<ResponseAPI<{}>>({
                data: {},
                ok: false,
                message: "This user is assigned to this plant",
            })
        }
        const data = await prisma.projectsOnUsers.create({
            data: {
                projectId,
                userId,
            },
        })

        return NextResponse.json<ResponseAPI<ProjectsOnUsers>>({
            data,
            ok: true,
            message: "The resource was created successfully",
        })
    } catch (error) {
        return NextResponse.json<ResponseAPI<{}>>({
            data: {},
            ok: false,
            message: "Failed to create the plant to user",
        })
    }
}
