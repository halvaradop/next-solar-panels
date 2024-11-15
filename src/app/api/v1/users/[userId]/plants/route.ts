import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Plants } from "@prisma/client"
import { Params, ResponseAPI } from "@/lib/@types/types"

/**
 * Handle the GET request to retrieve all plants related to a specific user
 *
 * @param {NextRequest} request - The HTTP request containing the request data.
 * @param {Params<"userId">} params - The dynamic parameter to extract the `userId`.
 * @returns {Promise<NextResponse>} - HTTP response with the plants related to the user.
 * @example
 * ```ts
 * const response = await fetch("/api/v1/users/{userId}/plants")
 * const data = await response.json()
 * ```
 */
export const GET = async (request: NextRequest, { params }: Params<"userId">): Promise<NextResponse> => {
    try {
        const userId = parseInt(params.userId)
        const data = await prisma.companies
            .findMany({
                where: {
                    Plants: {
                        some: {
                            UserPlants: {
                                some: {
                                    userId: userId,
                                },
                            },
                        },
                    },
                },
                include: {
                    Plants: true,
                },
            })
            .then((companies) => companies.flatMap((companies) => companies.Plants))
        return NextResponse.json<ResponseAPI<unknown>>({
            data,
            ok: true,
        })
    } catch (error) {
        return NextResponse.json<ResponseAPI<Plants[]>>(
            {
                data: [],
                ok: false,
                message: "Failed to retrieve the data",
            },
            { status: 404 }
        )
    }
}
