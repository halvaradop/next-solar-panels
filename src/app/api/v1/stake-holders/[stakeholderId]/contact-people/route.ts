import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { ContactPerson } from "@prisma/client"
import { Params, ResponseAPI } from "@/lib/@types/types"

/**
 * Handle the GET request to retrieve the users related to a specific client.
 *
 * @param {NextRequest} request - The HTTP request data.
 * @param {Params<"stakeholderId">} params - The dynamic parameter to extract the `stakeholderId`.
 * @returns {Promise<NextResponse>} - HTTP response with the users related to the client.
 * @example
 * ```ts
 * const response = await fetch("{domain}/api/v1/stakeholders/{stakeholderId}/contact-people");
 * const data = await response.json();
 * ```
 */
export const GET = async (request: NextRequest, { params }: Params<"stakeholderId">): Promise<NextResponse> => {
    try {
        const idStakeholder = (await params).stakeholderId
        const data = await prisma.contactPerson.findMany({
            where: {
                project: {
                    some: {
                        idStakeholder,
                    },
                },
            },
            include: {
                role: true,
                phones: true,
            },
        })

        return NextResponse.json<ResponseAPI<ContactPerson[]>>({
            data,
            ok: true,
        })
    } catch (error) {
        return NextResponse.json<ResponseAPI<ContactPerson[]>>(
            {
                data: [],
                ok: false,
                message: "Failed to retrieve the stakeholders",
            },
            { status: 404 }
        )
    }
}
