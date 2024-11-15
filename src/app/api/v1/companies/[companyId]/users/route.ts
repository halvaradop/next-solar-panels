import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Users } from "@prisma/client"
import { Params, ResponseAPI } from "@/lib/@types/types"

/**
 * TODO: add documentation
 *
 * @param {NextRequest} request - The HTTP request data
 * @param {Params<"userId">} params - The dynamic parameter to extract the ``.
 * @returns {Promise<NextResponse>} - HTTP response
 * @example
 * ```ts
 * const response = await fetch("/api/v1/companies/{companyId}/users")
 * const data = await response.json()
 * ```
 */
export const GET = async (request: NextRequest, { params }: Params<"companyId">): Promise<NextResponse> => {
    try {
        const companyId = parseInt(params.companyId)
        const data = await prisma.users.findMany({
            where: {
                UserPlants: {
                    some: {
                        plant: {
                            companyId,
                        },
                    },
                },
            },
            include: {
                PhoneUsers: true,
                role: true,
            },
        })
        const map = data.map(({ PhoneUsers, ...spread }) => ({
            phoneUsers: PhoneUsers,
            ...spread,
        }))
        return NextResponse.json<ResponseAPI<Users[]>>({
            data: map,
            ok: true,
        })
    } catch (error) {
        return NextResponse.json<ResponseAPI<Users[]>>(
            {
                data: [],
                ok: false,
                message: "Failed to retrieve the users",
            },
            { status: 404 }
        )
    }
}
