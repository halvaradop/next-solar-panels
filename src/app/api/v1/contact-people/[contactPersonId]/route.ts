import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Params, ResponseAPI, UserSession } from "@/lib/@types/types"

/**
 * Handles the GET request to retrieve specific contact person information.
 *
 * @param {NextRequest} request - The HTTP request containing the request data.
 * @param {Params<"contactPersonId">} params - The dynamic parameter to extract the `contactPersonId`.
 * @returns {Promise<NextResponse>} - The HTTP response containing the user information.
 * @example
 * ```ts
 * const response = await fetch("{domain}/api/v1/contact-people/{contactPersonId}");
 * const data = await response.json();
 * ```
 */
export const GET = async (request: NextRequest, { params }: Params<"contactPersonId">): Promise<NextResponse> => {
    try {
        const idContactPerson = (await params).contactPersonId
        const data = await prisma.contactPerson.findUnique({
            where: {
                idContactPerson,
            },
            select: {
                idContactPerson: true,
                email: true,
                firstName: true,
                lastName: true,
                role: true,
            },
        })

        if (!data) {
            return NextResponse.json<ResponseAPI<UserSession>>(
                {
                    data: {} as UserSession,
                    ok: false,
                    message: "Failed to retrieve the contact person information",
                },
                { status: 404 }
            )
        }

        return NextResponse.json<ResponseAPI<UserSession>>({
            data: {} as UserSession,
            ok: true,
            message: "The resource was retrieved successfuly",
        })
    } catch (error) {
        return NextResponse.json<ResponseAPI<UserSession>>(
            {
                data: {} as UserSession,
                ok: false,
                message: "Failed to retrieve the contact person information",
            },
            { status: 404 }
        )
    }
}