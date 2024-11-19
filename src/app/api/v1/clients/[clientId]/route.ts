import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { ProjectsOnUsers } from "@prisma/client"
import { Params, ResponseAPI } from "@/lib/@types/types"

/**
 * TODO: add documentation ???
 *
 * @param {NextRequest} request -
 * @param {Params<"companyId">} param1 -
 * @returns {Promise<NextResponse>} -
 */
export const GET = async (request: NextRequest, { params }: Params<"clientId">): Promise<NextResponse> => {
    try {
        const clientsId = params.clientId
        const data = await prisma.projectsOnUsers.findMany({
            where: {
                project: {
                    clientsId,
                },
            },
            include: {
                user: true,
                project: true,
            },
        })
        return NextResponse.json<ResponseAPI<ProjectsOnUsers[]>>({
            data,
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
