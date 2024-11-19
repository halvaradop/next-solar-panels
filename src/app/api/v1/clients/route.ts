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
            where: {
                NOT: {
                    phones: {
                        some: {
                            userId: null,
                        },
                    },
                },
            },
            include: {
                phones: true,
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
 * Handle the POST request to create a new company in the database.
 *
 * @param {NextRequest} request - The HTTP request data containing the new company information.
 * @returns {Promise<NextResponse>} - HTTP response with the newly created company or an error message.
 * @example
 * ```ts
 * const response = await fetch("{domain}/api/v1/client", {
 *   method: "POST",
 *   body: JSON.stringify({
 *     clientName: "Company Name",
 *     mail: "company@gmail.com",
 *     phone: "1234567890",
 *     fax: "1234567890",
 *     website: "company.info",
 *     password:"savepassword",
 *   }),
 * })
 * ```
 */
export const POST = async (request: NextRequest): Promise<NextResponse> => {
    try {
        const response = await request.json()
        const { name, email, phones, fax, website, password } = response

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
                        number: phones,
                    },
                },
                fax,
                website,
                password,
            },
            include: {
                phones: true,
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
