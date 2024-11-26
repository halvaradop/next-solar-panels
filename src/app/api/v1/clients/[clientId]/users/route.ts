import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { User } from "@prisma/client"
import { Params, ResponseAPI } from "@/lib/@types/types"

/**
 * TODO: update schema
 *
 * Handle the GET request to retrieve the users related to a specific client
 *
 * @param {NextRequest} request - The HTTP request data containing the request data.
 * @param {Params<"clientId">} params - The dynamic parameter to extract the `clientId`.
 * @returns {Promise<NextResponse>} - HTTP response with the users related to the client.
 * @example
 * ```ts
 * const response = await fetch("/api/v1/clients/{clientId}/users")
 * const data = await response.json()
 * ```
 */
export const GET = async (request: NextRequest, { params }: Params<"clientId">): Promise<NextResponse> => {
    try {
        const clientsId = params.clientId
        const data = await prisma.user.findMany({
            where: {
                projectsOnUsers: {
                    some: {
                        project: {
                            clientsId,
                        },
                    },
                },
            },
            include: {
                phones: true,
                role: true,
            },
        })

        return NextResponse.json<ResponseAPI<User[]>>({
            data,
            ok: true,
        })
    } catch (error) {
        return NextResponse.json<ResponseAPI<User[]>>(
            {
                data: [],
                ok: false,
                message: "Failed to retrieve the users",
            },
            { status: 404 }
        )
    }
}
