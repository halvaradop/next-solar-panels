import { ResponseAPI } from "@/lib/@types/types"
import { prisma } from "@/lib/prisma"
import { Address } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

/**
 * Handles the POST request to create a new address resource.
 *
 * @param {NextRequest} request - The incoming request object.
 * @returns {Promise<NextResponse>} - The response object containing the result of the address creation.
 * @example
 * ```ts
 * const request = await fetch("{domain}/api/v1/addresses", {
 *    method: "POST"
 *    body: JSON.stringify({ ... })
 * })
 * const response = await request.json()
 * ```
 */
export const POST = async (request: NextRequest): Promise<NextResponse> => {
    try {
        const response = await request.json()

        const data = await prisma.address.create({
            data: response,
        })

        return NextResponse.json<ResponseAPI<Address>>({
            data,
            ok: true,
            message: "The resource was created successfuly",
        })
    } catch {
        return NextResponse.json<ResponseAPI<{}>>(
            {
                data: {},
                ok: false,
                message: "Failed to create the client",
            },
            { status: 400 }
        )
    }
}

/**
 * Handler for the GET request to fetch addresses.
 *
 * @returns {Promise<NextResponse>} - A promise that resolves to a NextResponse object containing the fetched addresses or an error message.
 *
 * @example
 * ```ts
 * const request = await fetch("{domain}/api/v1/addresses")
 * const response = await request.json()
 * ```
 */
export const GET = async (): Promise<NextResponse> => {
    try {
        const data = await prisma.address.findMany()
        return NextResponse.json<ResponseAPI<Address[]>>({
            data,
            message: "Addresses fetched successfully",
            ok: true,
        })
    } catch {
        return NextResponse.json<ResponseAPI<Address[]>>({
            data: [],
            message: "Failed to fetch addresses",
            ok: false,
        })
    }
}
