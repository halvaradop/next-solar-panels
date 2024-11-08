import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { ResponseAPI } from "@/lib/@types/types"
import { Zone } from "@prisma/client"

/**
 * Retrieves all zones from the database.
 *
 * This function performs a query to fetch all entries in the `zone` table.
 * If the query is successful, it returns a response with the data and a success status.
 * If an error occurs during the query, it returns a 404 status with an empty data array.
 *
 * @returns {Promise<NextResponse>} A JSON response containing all zones from the database
 * or an empty array if the query fails
 *
 * @example
 * ```typescript
 * const response = await fetch("/api/dashboards/zones")
 * const data = await response.json()
 * ```
 */
export const GET = async (): Promise<NextResponse> => {
    try {
        const data = await prisma.zone.findMany()
        return NextResponse.json<ResponseAPI<Zone[]>>({
            data,
            ok: true,
        })
    } catch (error) {
        return NextResponse.json<ResponseAPI<Zone[]>>({ data: [], ok: false }, { status: 404 })
    }
}

/**
 * Retrieves all zones associated with a specific user from the database.
 *
 * This function accepts a user ID from the request body, which is used to fetch
 * only the zones related to the specified user. If the query is successful,
 * it returns a response with the relevant data and a success status.
 * If an error occurs during the query, it returns a 404 status with an empty data array.
 *
 * @param request - The HTTP request containing a JSON payload with the user ID
 * @returns {Promise<NextResponse>} A JSON response containing zones associated with the user
 * or an empty array if the query fails.
 *
 * @example
 * ```typescript
 * const response = await fetch("/api/dashboards/zones", {
 *    method: "POST",
 *    body: JSON.stringify({ userId: 1 })
 * })
 * const data = await response.json()
 * ```
 */
export const POST = async (request: NextRequest): Promise<NextResponse> => {
    try {
        const response = await request.json()
        const { userId } = response as { userId: number }
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
