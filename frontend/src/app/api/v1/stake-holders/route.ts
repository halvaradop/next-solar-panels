import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { StakeHolder } from "@prisma/client"
import { ResponseAPI } from "@/lib/@types/types"

/**
 * Handle the POST request to create a new stakeholders in the database.
 *
 * @param {NextRequest} request - The HTTP request data containing the new stakeholders information.
 * @returns {Promise<NextResponse>} - HTTP response with the newly created stakeholders or an error message.
 * @example
 * ```ts
 * const response = await fetch("{domain}/api/v1/stakeholders", {
 *   method: "POST",
 *   body: JSON.stringify({
 *     name: "Client Name",
 *     industry: "Client Industry",*
 *     email: "client@gmail.com",
 *     fax: "1234567890",
 *     www: "client.info",
 *     password:"savepassword",
 *     idContactPerson: "1",
 *     idAddress: 1,
 *     idPicture: 1,
 *   }),
 * })
 * ```
 */
export const POST = async (request: NextRequest): Promise<NextResponse> => {
    try {
        const response = await request.json()
        const { email, website: www, contactPerson, ...spread } = response

        const existEmail = await prisma.stakeHolder.findFirst({
            where: { email },
        })

        if (existEmail) {
            return NextResponse.json<ResponseAPI<{}>>({
                data: {},
                ok: false,
                message: "This email is already registered",
            })
        }
        const data = await prisma.stakeHolder.create({
            data: {
                ...spread,
                email,
                www,
                idContactPerson: contactPerson,
                idAddress: 1,
            },
        })

        return NextResponse.json<ResponseAPI<StakeHolder>>({
            data,
            ok: true,
            message: "The resource was created successfuly",
        })
    } catch {
        return NextResponse.json<ResponseAPI<{}>>({
            data: {},
            ok: false,
            message: "Failed to create the client",
        })
    }
}
