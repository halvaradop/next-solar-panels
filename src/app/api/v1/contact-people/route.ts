import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { ContactPerson } from "@prisma/client"
import { ResponseAPI } from "@/lib/@types/types"

/**
 * Handle the GET request to retrieve all contact people from the database.
 *
 * @returns {Promise<NextResponse>} - The HTTP response with the contact people fetched.
 * @example
 * ```ts
 * const response = await fetch("{domain}/api/v1/contact-people")
 * const data = await response.json()
 * ```
 */
export const GET = async (): Promise<NextResponse> => {
    try {
        const data = await prisma.contactPerson.findMany()
        return NextResponse.json<ResponseAPI<ContactPerson[]>>({
            data,
            ok: true,
            message: "Contact people retrieved successfully",
        })
    } catch (error) {
        return NextResponse.json<ResponseAPI<ContactPerson[]>>(
            {
                data: [],
                ok: false,
                message: "Failed to retrieve contact people",
            },
            { status: 400 }
        )
    }
}
/**
 * Handle the POST request to create a new contact person in the database.
 *
 * @param {NextRequest} request - The HTTP request data received with the new contact person information.
 * @returns {Promise<NextResponse>} - HTTP response with the new contact person created.
 * @example
 * ```ts
 * const response = await fetch("{domain}/api/v1/contact-people", {
 *   method: "POST",
 *   body: JSON.stringify({
 *     firstName: "John",
 *     lastName: "Doe",
 *     fax: "123-456-7890",
 *     www: "https://example.com",
 *     email: "john@gmail.com",
 *     password: "password",
 *     roleId: "1",
 *   }),
 * })
 * const data = await response.json()
 * ```
 */
export const POST = async (request: NextRequest): Promise<NextResponse> => {
    try {
        const { email, idRole, password, number, website: www, ...spread } = await request.json()
        const existingContactPerson = await prisma.contactPerson.findUnique({
            where: { email },
        })
        if (existingContactPerson) {
            return NextResponse.json<ResponseAPI<null>>({
                data: null,
                ok: false,
                message: "This email is already registered",
            })
        }
        {
            /*todo fix : change databse varchar to char*/
        }
        console.log(spread)
        const newContactPerson = await prisma.contactPerson.create({
            data: {
                ...spread,
                email,
                password,
                www,
                idRole: parseInt(idRole),
            },
        })

        return NextResponse.json<ResponseAPI<ContactPerson>>({
            data: newContactPerson,
            ok: true,
            message: "Contact person created successfully",
        })
    } catch (error) {
        return NextResponse.json<ResponseAPI<{}>>(
            {
                data: {},
                ok: false,
                message: "Failed to create the contact person",
            },
            { status: 400 }
        )
    }
}
