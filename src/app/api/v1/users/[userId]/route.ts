import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Params, ResponseAPI, UserSession } from "@/lib/@types/types"

/**
 * TODO: What happens if the user has multiples companies?
 *
 * Handle the GET request to retrieve a specific user information
 *
 * @param {NextRequest} request - The HTTP request containing the request data.
 * @param {Params<"userId">} params - The dynamic parameter to extract the `userId`.
 * @returns {Promise<NextResponse>} - The HTTP response containing the user information.
 * @example
 * ```ts
 * const response = await fetch("/api/v1/users/{userId}")
 * const data = await response.json()
 * ```
 */

/**
 * TODO: fix companyId
 */
export const GET = async (request: NextRequest, { params }: Params<"userId">): Promise<NextResponse> => {
    try {
        const userId = params.userId
        const data = await prisma.user.findUnique({
            where: {
                userId,
            },
            select: {
                userId: true,
                email: true,
                firstName: true,
                lastName: true,
                role: true,
                projectsOnUsers: {
                    select: {
                        project: {
                            select: {
                                clients: {
                                    select: {
                                        clientId: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        })

        if (!data) {
            return NextResponse.json<ResponseAPI<UserSession>>(
                {
                    data: {} as UserSession,
                    ok: false,
                    message: "Failed to retrieve the user information",
                },
                { status: 404 }
            )
        }
        return NextResponse.json<ResponseAPI<UserSession>>({
            data: data as UserSession,
            ok: true,
            message: "The resource was retrieved successfuly",
        })
    } catch (error) {
        return NextResponse.json<ResponseAPI<UserSession>>(
            {
                data: {} as UserSession,
                ok: false,
                message: "Failed to retrieve the user information",
            },
            { status: 404 }
        )
    }
}
