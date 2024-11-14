import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Params, ResponseAPI, UsersResponse } from "@/lib/@types/types"

/**
 * TODO: move this route to /api/v1/users/{userId}
 *
 * Handle the GET request to retrieve a specific employee information
 *
 * @param {NextRequest} request - The HTTP request containing the request data.
 * @param {Params<"userId">} params - The dynamic parameter to extract the `userId`.
 * @returns {Promise<NextResponse>} - The HTTP response containing the employee information.
 * @example
 * ```ts
 * const response = await fetch("/api/v1/employees/{userId}")
 * const data = await response.json()
 * ```
 */
export const GET = async (request: NextRequest, { params }: Params<"userId">): Promise<NextResponse> => {
    try {
        const userId = parseInt(params.userId)
        const data = await prisma.users.findUnique({
            where: {
                userId,
            },
            select: {
                userId: true,
                email: true,
                firstName: true,
                lastName: true,
                role: true,
                UserPlants: {
                    select: {
                        plant: {
                            select: {
                                company: {
                                    select: {
                                        companyId: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        })
        if (!data) {
            return NextResponse.json<ResponseAPI<UsersResponse>>(
                {
                    data: {} as UsersResponse,
                    ok: false,
                    message: "Failed to retrieve the user information",
                },
                { status: 404 }
            )
        }
        return NextResponse.json<ResponseAPI<UsersResponse>>({
            data,
            ok: true,
            message: "The resource was retrieved successfuly",
        })
    } catch (error) {
        return NextResponse.json<ResponseAPI<UsersResponse>>(
            {
                data: {} as UsersResponse,
                ok: false,
                message: "Failed to retrieve the user information",
            },
            { status: 404 }
        )
    }
}
