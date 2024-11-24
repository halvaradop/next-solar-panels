import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { User } from "@prisma/client"
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
        const users = await prisma.user.findMany()
        return NextResponse.json<ResponseAPI<User[]>>({
            data: users,
            ok: true,
            message: "Users retrieved successfully",
        })
    } catch (error) {
        return NextResponse.json<ResponseAPI<User[]>>(
            {
                data: [],
                ok: false,
                message: "Failed to retrieve users",
            },
            { status: 500 }
        )
    }
}

/**
 * Handle the POST request to create a new user in the database.
 *
 * @param {NextRequest} request - The HTTP request data received with the new user information.
 * @returns {Promise<NextResponse>} - HTTP response with the new user created.
 * @example
 * ```ts
 * const response = await fetch("/api/v1/users", {
 *   method: "POST",
 *   body: JSON.stringify({
 *     firstName: "John",
 *     lastName: "Doe",
 *     email: "john@gmail.com",
 *     phone: 1234567890,
 *     password: "password",
 *     rol: 1,
 *   }),
 * })
 */
export const POST = async (request: NextRequest): Promise<NextResponse> => {
    try {
        const response = await request.json()

        const { firstName, website, email, number, lastName, password, roleId, project, fax } = response

        const existEmail = await prisma.user.findFirst({
            where: { email },
        })

        if (existEmail) {
            return NextResponse.json<ResponseAPI<{}>>({
                data: {},
                ok: false,
                message: "This email is already registered",
            })
        }
        const data = await prisma.user.create({
            data: {
                firstName,
                email,
                website,
                lastName,
                fax,
                password,
                roleId: parseInt(roleId),
                phones: {
                    create: {
                        number,
                    },
                },
                projectsOnUsers: {
                    create: {
                        projectId: project,
                    },
                },
            },
        })

        return NextResponse.json<ResponseAPI<User>>({
            data,
            ok: true,
            message: "The resource was created successfuly",
        })
    } catch (error) {
        return NextResponse.json<ResponseAPI<{}>>({
            data: {},
            ok: false,
            message: "Failed to create the user",
        })
    }
}
