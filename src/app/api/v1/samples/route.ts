import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Samples } from "@prisma/client"
import { ResponseAPI } from "@/lib/@types/types"

/**
 * Handle the GET request to retrieve all samples from the database.
 *
 * @returns {Promise<NextResponse>} - HTTP response with all samples.
 * @example
 * ```ts
 * const response = await fetch("/api/v1/samples")
 * const data = await response.json()
 * ```
 */
export const GET = async (): Promise<NextResponse> => {
    try {
        const data = await prisma.samples.findMany()
        return NextResponse.json<ResponseAPI<Samples[]>>({
            data,
            ok: true,
            message: "The resource was retrieved successfuly",
        })
    } catch (error) {
        return NextResponse.json<ResponseAPI<Samples[]>>(
            {
                data: [],
                ok: false,
                message: "Failed to retrieve the samples",
            },
            { status: 404 }
        )
    }
}
