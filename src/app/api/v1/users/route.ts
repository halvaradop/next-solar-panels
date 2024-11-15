import { NextRequest, NextResponse } from "next/server"
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
        const { firstName, email, phone, lastName, password, rol, plant } = response

        const existEmail = await prisma.users.findFirst({
            where: { email },
        })

        if (existEmail) {
            return NextResponse.json<ResponseAPI<{}>>({
                data: {},
                ok: false,
                message: "This email is already registered",
            })
        }
        const data = await prisma.users.create({
            data: {
                firstName,
                email,
                lastName,
                password,
                roleId: parseInt(rol),
                PhoneUsers: {
                    create: {
                        phoneNumber: parseInt(phone),
                    },
                },
                UserPlants: {
                    create: {
                        plantId: parseInt(plant),
                    },
                },
            },
            include: {
                PhoneUsers: true,
            },
        })

        return NextResponse.json<ResponseAPI<Users>>({
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
