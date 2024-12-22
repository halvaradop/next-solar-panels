import { Params, ResponseAPI } from "@/lib/@types/types"
import { prisma } from "@/lib/prisma"
import { Address } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

/**
 * Handles GET requests to fetch an address by its ID.
 *
 * @param {NextRequest} request - The incoming Next.js request object.
 * @param {Params<"addressId">} params - The route parameters containing the address ID.
 * @returns {Promise<NextResponse>} A promise that resolves to a NextResponse object containing the address data or an error message.
 * @example
 * ```ts
 * const response = await fetch("{domain}/api/v1/address/{addressId}")
 * const data = await response.json()
 * ```
 */
export const GET = async (request: NextRequest, { params }: Params<"addressId">): Promise<NextResponse> => {
    const slug = (await params).addressId
    const idAddress = parseInt(slug)
    try {
        const data = await prisma.address.findUnique({
            where: { idAddress },
        })
        if (!data) {
            return NextResponse.json<ResponseAPI<{}>>(
                {
                    data: {},
                    ok: false,
                    message: "The resource was not found",
                },
                { status: 404 }
            )
        }

        return NextResponse.json<ResponseAPI<Address>>({
            data,
            ok: true,
            message: "The resource was fetched successfuly",
        })
    } catch {
        return NextResponse.json<ResponseAPI<{}>>(
            {
                data: {},
                ok: false,
                message: "Failed to fetch the resource",
            },
            { status: 400 }
        )
    }
}
