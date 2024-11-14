import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Users } from "@prisma/client"
import { ResponseAPI } from "@/lib/@types/types"

/**
 * Handle the GET request to retrieve all users from the database.
 *
 * @returns {Promise<NextResponse>} - The HTTP response with the users fetched
 * @example
 * ```ts
 * const response = await fetch("/api/v1/users")
 * const data = await response.json()
 * ```
 */
export const GET = async (): Promise<NextResponse> => {
    try {
        const users = await prisma.users.findMany()
        return NextResponse.json<ResponseAPI<Users[]>>({
            data: users,
            ok: true,
            message: "Users retrieved successfully",
        })
    } catch (error) {
        return NextResponse.json<ResponseAPI<Users[]>>(
            {
                data: [],
                ok: false,
                message: "Failed to retrieve users",
            },
            { status: 500 }
        )
    }
}
