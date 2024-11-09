import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Zones } from "@prisma/client"
import { ResponseAPI } from "@/lib/@types/types"

/**
 * Handle the GET request to retrieve all zones from the database.
 *
 * @returns {Promise<NextResponse>} - HTTP response with all zones.
 * @example
 * ```ts
 * const response = await fetch("/api/v1/zones")
 * const data = await response.json()
 * ```
 */
export const GET = async (): Promise<NextResponse> => {
    try {
        const data = await prisma.zones.findMany()
        return NextResponse.json<ResponseAPI<Zones[]>>({
            data,
            ok: true,
            message: "The resource was retrieved successfuly",
        })
    } catch (error) {
        return NextResponse.json<ResponseAPI<Zones[]>>(
            {
                data: [],
                ok: false,
                message: "Failed to retrieve zones",
            },
            { status: 404 }
        )
    }
}
