import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { ProjectsOnUsers } from "@prisma/client"
import { ResponseAPI } from "@/lib/@types/types"

/**
 * Handle the POST request to assign a project to a user
 *
 * @param {NextRequest} request - The HTTP request data containing the user and project id
 * @returns {Promise<NextResponse>} - HTTP response containing the created projectOnUser
 */
export const POST = async (request: NextRequest): Promise<NextResponse> => {
    try {
        const response = await request.json()
        const { user, project } = response
        const userId = user
        const projectId = project
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
                message: "This user is assigned to this project",
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
            message: "Failed to create the project to user",
        })
    }
}
