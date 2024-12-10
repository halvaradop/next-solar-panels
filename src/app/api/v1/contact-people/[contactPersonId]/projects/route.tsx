import { Params, ResponseAPI } from "@/lib/@types/types"
import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

/**
 * Handle the GET request to retrieve all projects related to a specific contact person
 *
 * @param {NextRequest} request - The HTTP request object.
 * @param {Params<"contactPersonId">} params - The dynamic parameter to extract the `contactPersonId`.
 * @returns {Promise<NextResponse>} - HTTP response with the projects related to the contact person.
 */
export const GET = async (request: NextRequest, { params }: Params<"contactPersonId">): Promise<NextResponse> => {
    const idContactPerson = (await params).contactPersonId
    try {
        const data = await prisma.project.findMany({
            where: {
                idContactPerson,
            },
        })
        return NextResponse.json<ResponseAPI<{}>>({
            data,
            message: "Successfully retrieved projects for the specified user",
            ok: true,
        })
    } catch (error) {
        return NextResponse.json<ResponseAPI<{}>>(
            {
                data: {},
                ok: false,
                message: "Failed to retrieve samples for the specified user",
            },
            { status: 400 }
        )
    }
}
