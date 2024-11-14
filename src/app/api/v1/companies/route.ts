import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Companies } from "@prisma/client"
import { ResponseAPI } from "@/lib/@types/types"

/**
 * Handle the GET request to retrieve all companies in the database.
 *
 * @returns {Promise<NextResponse>} - The HTTP response with the companies retrieved.
 * @example
 * ```ts
 * const response = await fetch("{domain}/api/v1/companies")
 * const data = await response.json()
 * ```
 */
export const GET = async (): Promise<NextResponse> => {
    try {
        const data = await prisma.companies.findMany({
            include: {
                PhoneCompanies: true,
            },
        })
        return NextResponse.json<ResponseAPI<Companies[]>>({
            data,
            ok: true,
            message: "The resource was retrieved successfuly",
        })
    } catch (error) {
        return NextResponse.json<ResponseAPI<null>>(
            {
                data: null,
                ok: false,
                message: "Failed to retrieve companies",
            },
            { status: 500 }
        )
    }
}
