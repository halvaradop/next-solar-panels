import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Plants } from "@prisma/client"
import { ResponseAPI } from "@/lib/@types/types"

/**
 * Handles the GET request to retrieve all plants from the database.
 *
 * @returns {Promise<NextResponse>} - The HTTP response containing the plants
 * retrieved from the database.
 * @example
 * ```ts
 * const response = await fetch("/api/v1/plants")
 * const data = await response.json()
 * ```
 */
export const GET = async (): Promise<NextResponse> => {
    try {
        const data = await prisma.plants.findMany()
        return NextResponse.json<ResponseAPI<Plants[]>>({
            data,
            ok: true,
            message: "The resource was retrieved successfully",
        })
    } catch (error) {
        return NextResponse.json<ResponseAPI<Plants[]>>(
            {
                data: [],
                ok: false,
                message: "Failed to retrieve the plants",
            },
            { status: 500 }
        )
    }
}
