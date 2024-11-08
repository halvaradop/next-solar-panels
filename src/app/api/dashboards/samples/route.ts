import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { ResponseAPI, SampleZone } from "@/lib/@types/types"

/**
 * Retrieves all samples associated with a specific user from the database.
 *
 * This function accepts a user ID from the request body, which is used to fetch only the
 * zones related to the specified user. If the query is successful,
 * it returns a response with the relevant data and a success status.
 * If an error occurs during the query, it returns a 404 status with an empty data array.
 *
 * @returns {Promise<NextResponse>} A JSON response containing all samples from the database
 * or an empty array if the query fails
 *
 * @example
 * ```typescript
 * const response = await fetch("/api/dashboards/samples", {
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
        const data = await prisma.sample.findMany({
            where: {
                Zone: {
                    Plant: {
                        Employee: {
                            id: userId,
                        },
                    },
                },
            },
            include: {
                Zone: true,
            },
        })
        return NextResponse.json<ResponseAPI<SampleZone[]>>({ data, ok: true })
    } catch (error) {
        return NextResponse.json<ResponseAPI<SampleZone[]>>(
            {
                data: [],
                ok: false,
                message: "Error to retrieve the data",
            },
            { status: 404 }
        )
    }
}
