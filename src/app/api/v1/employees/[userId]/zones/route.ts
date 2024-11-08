import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Zone } from "@prisma/client"
import { Params, ResponseAPI } from "@/lib/@types/types"

/**
 * Handle the GET request to retrieve all zones related to a specific employee
 * in the database.
 *
 * @param request - The HTTP request data received with the employee ID.
 * @returns {Promise<NextResponse>} - HTTP response with the zones related to the employee.
 * @example
 * ```ts
 * const response = await fetch("/api/v1/employees/{userId}/zones")
 * const data = await response.json()
 * ```
 */
export const GET = async (request: NextRequest, { params }: Params<"userId">): Promise<NextResponse> => {
    try {
        const userId = parseInt(params.userId)
        const data = await prisma.zone.findMany({
            where: {
                Plant: {
                    Employee: {
                        id: userId,
                    },
                },
            },
        })
        return NextResponse.json<ResponseAPI<Zone[]>>({
            data,
            ok: true,
        })
    } catch (error) {
        return NextResponse.json<ResponseAPI<Zone[]>>({ data: [], ok: true }, { status: 404 })
    }
}
