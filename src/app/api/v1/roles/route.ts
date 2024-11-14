import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Roles } from "@prisma/client"
import { ResponseAPI } from "@/lib/@types/types"

/**
 * Handles the GET request to retrieve all roles from the database.
 *
 * @returns {Promise<NextResponse>} - The HTTP response containing the roles
 * retrieved from the database.
 * @example
 * ```ts
 * const response = await fetch("/api/v1/roles")
 * const data = await response.json()
 * ```
 */
export const GET = async (): Promise<NextResponse> => {
    try {
        const data = await prisma.roles.findMany()
        return NextResponse.json<ResponseAPI<Roles[]>>({
            data,
            ok: true,
            message: "The resource was retrieved successfuly",
        })
    } catch (error) {
        return NextResponse.json<ResponseAPI<Roles[]>>(
            {
                data: [],
                ok: false,
                message: "Failed companies",
            },
            { status: 404 }
        )
    }
}
