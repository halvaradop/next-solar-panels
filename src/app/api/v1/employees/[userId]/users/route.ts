import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Users } from "@prisma/client"
import { Params, ResponseAPI } from "@/lib/@types/types"

/**
 * Handle the POST request to create a new user in the database.
 *
 * @param {NextRequest} request - The HTTP request data received with the new user information.
 * @returns {Promise<NextResponse>} - HTTP response with the new user created.
 * @example
 * ```ts
 * const response = await fetch("/api/v1/employees/{userId}/users", {
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
        const { firstName, email, phone, lastName, password, rol } = response

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
            message: "Failed to create the employee",
        })
    }
}

/**
 * Handle the GET request to retrieve all users related to a specific employee.
 *
 * @param {NextRequest} request - The HTTP request data created by the request.
 * @param {Params<"userId">} params - The dynamic parameter to extract the `userId`.
 * @returns {Promise<NextResponse>} - HTTP response with the users related to the employee.
 * @example
 * ```ts
 * const response = await fetch("/api/v1/employees/{userId}/users")
 * const data = await response.json()
 * ```
 */
export const GET = async (request: NextRequest, { params }: Params<"userId">): Promise<NextResponse> => {
    try {
        const userId = parseInt(params.userId)
        const company = await prisma.companies.findFirst({
            where: {
                Plants: {
                    some: {
                        UserPlants: {
                            some: {
                                userId: userId,
                            },
                        },
                    },
                },
            },
        })
        const data = await prisma.users.findMany({
            where: {
                UserPlants: {
                    some: {
                        plant: {
                            companyId: company?.companyId,
                        },
                    },
                },
            },
        })
        return NextResponse.json<ResponseAPI<Users[]>>({
            data,
            ok: true,
        })
    } catch (error) {
        return NextResponse.json<ResponseAPI<Users[]>>(
            {
                data: [],
                ok: false,
                message: "Failed to retrieve the users",
            },
            { status: 404 }
        )
    }
}
