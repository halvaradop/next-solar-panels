import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { StakeHolder } from "@prisma/client"
import { ResponseAPI } from "@/lib/@types/types"
import { picture } from "framer-motion/client"

/**
 * Handles the GET request to retrieve all stakeholders from the database.
 *
 * @returns {Promise<NextResponse>} - The HTTP response containing the list of stakeholders or an error message.
 * @example
 * ```ts
 * const response = await fetch("{domain}/api/v1/stakeholders")
 * const data = await response.json()
 * ```
 */
export const GET = async (): Promise<NextResponse> => {
    try {
        const data = await prisma.stakeHolder.findMany({
            include: {
                contactPerson: true,
            },
        })

        return NextResponse.json<ResponseAPI<StakeHolder[]>>({
            data,
            ok: true,
            message: "Stakeholders retrieved successfully",
        })
    } catch (error) {
        return NextResponse.json<ResponseAPI<null>>(
            {
                data: null,
                ok: false,
                message: "Error retrieving stakeholders",
            },
            { status: 400 }
        )
    }
}

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
        const { email, website: www, contactPerson, number, ...spread } = response

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
        console.log(contactPerson)
        const data = await prisma.stakeHolder.create({
            data: {
                ...spread,
                email,
                www,
                idContactPerson: contactPerson,
                type: "CLIENT",
                idPicture: 1,
                idAddress: 1,
            },
        })

        return NextResponse.json<ResponseAPI<StakeHolder>>({
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
