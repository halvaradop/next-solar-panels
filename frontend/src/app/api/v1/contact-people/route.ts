import { NextRequest, NextResponse } from "next/server"
import { ContactPerson } from "@/lib/@types/models"
import { ResponseAPI } from "@/lib/@types/types"

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
        const { email, idRole, password, website: www, ...spread } = await request.json()
        // @ts-expect-error
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
        // @ts-expect-error
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
    } catch {
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
