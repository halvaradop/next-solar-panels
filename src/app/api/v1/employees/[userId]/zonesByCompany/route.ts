import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Zones } from "@prisma/client"
import { Params, ResponseAPI } from "@/lib/@types/types"

/**
 * TODO: migrate this route to companies
 *
 * Handle the GET request to retrieve the zones related to a specific employee.
 *
 * @param {NextRequest} request - The HTTP request containing the request data.
 * @param {Params<"userId">} params - The dynamic parameter to extract the `userId`.
 * @returns {Promise<NextResponse>} - HTTP response with the zones related to the employee.
 * @example
 * ```ts
 * const response = await fetch("/api/v1/employees/{userId}/zonesByCompany")
 * const data = await response.json()
 * ```
 */
export const GET = async (request: NextRequest, { params }: Params<"userId">): Promise<NextResponse> => {
    try {
        const userId = parseInt(params.userId)
        const company = await prisma.companies.findFirst({
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
        })
        const data = await prisma.zones.findMany({
            where: {
                plant: {
                    companyId: company?.companyId,
                },
            },
            include: {
                plant: {
                    select: {
                        plantName: true,
                    },
                },
            },
        })
        return NextResponse.json<ResponseAPI<Zones[]>>({
            data,
            ok: true,
        })
    } catch (error) {
        return NextResponse.json<ResponseAPI<Zones[]>>(
            {
                data: [],
                ok: true,
            },
            { status: 404 }
        )
    }
}
