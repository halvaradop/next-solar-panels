import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Client } from "@prisma/client"
import { ResponseAPI } from "@/lib/@types/types"

/**
 * Handle the GET request to retrieve all client in the database.
 *
 * @returns {Promise<NextResponse>} - The HTTP response with the client retrieved.
 * @example
 * ```ts
 * const response = await fetch("{domain}/api/v1/client")
 * const data = await response.json()
 * ```
 */
export const GET = async (): Promise<NextResponse> => {
    try {
        const data = await prisma.client.findMany({
            include: {
                phones: true,
                user: true,
            },
        })

        const map = data.map(({ phones, ...spread }) => ({
            phone: phones,
            ...spread,
        }))

        return NextResponse.json<ResponseAPI<Client[]>>({
            data: map,
            ok: true,
            message: "The resource was retrieved successfuly",
        })
    } catch (error) {
        return NextResponse.json<ResponseAPI<null>>(
            {
                data: null,
                ok: false,
                message: "Failed to retrieve client",
            },
            { status: 500 }
        )
    }
}

/**
 * Handle the POST request to create a new client in the database.
 *
 * @param {NextRequest} request - The HTTP request data containing the new client information.
 * @returns {Promise<NextResponse>} - HTTP response with the newly created client or an error message.
 * @example
 * ```ts
 * const response = await fetch("{domain}/api/v1/client", {
 *   method: "POST",
 *   body: JSON.stringify({
 *     clientName: "client Name",
 *     mail: "client@gmail.com",
 *     phone: "1234567890",
 *     fax: "1234567890",
 *     website: "client.info",
 *     password:"savepassword",
 *   }),
 * })
 * ```
 */
export const POST = async (request: NextRequest): Promise<NextResponse> => {
    try {
        const response = await request.json()
        const { name, email, number, fax, website, password, user } = response

        const existEmail = await prisma.client.findFirst({
            where: { email },
        })

        if (existEmail) {
            return NextResponse.json<ResponseAPI<{}>>({
                data: {},
                ok: false,
                message: "This email is already registered",
            })
        }
        const data = await prisma.client.create({
            data: {
                name,
                email,
                phones: {
                    create: {
                        number,
                    },
                },
                fax,
                website,
                password,
                userId: user,
            },
        })

        return NextResponse.json<ResponseAPI<Client>>({
            data,
            ok: true,
            message: "The resource was created successfuly",
        })
    } catch (error) {
        return NextResponse.json<ResponseAPI<{}>>({
            data: {},
            ok: false,
            message: "Failed to create the client",
        })
    }
}
