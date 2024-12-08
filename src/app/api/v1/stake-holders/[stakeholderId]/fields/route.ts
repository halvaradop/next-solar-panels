import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Field } from "@prisma/client"
import { Params, ResponseAPI } from "@/lib/@types/types"

/**
 * Handles the GET request to retrieve fields associated with a specific stakeholder
 * from the database.
 *
 * @param {NextRequest} request - The HTTP request containing the request data.
 * @param {Params<"stakeholderId">} params - The dynamic parameter to extract the `stakeholderId`.
 * @returns {Promise<NextResponse>} - HTTP response containing the fields related to the stakeholder.
 * @example
 * ```ts
 * const response = await fetch("{domain}/api/v1/stakeholders/{stakeholderId}/fields")
 * const data = await response.json()
 * ```
 */
export const GET = async (request: NextRequest, { params }: Params<"stakeholderId">): Promise<NextResponse> => {
    try {
        const idStakeholder = (await params).stakeholderId
        const data = await prisma.field.findMany({
            where: {
                linkage: {
                    some: {
                        project: {
                            idStakeholder,
                        },
                    },
                },
            },
        })
        return NextResponse.json<ResponseAPI<Field[]>>({
            data,
            ok: true,
        })
    } catch (error) {
        return NextResponse.json<ResponseAPI<Field[]>>(
            {
                data: [],
                ok: false,
                message: "Failed to retrieve the data",
            },
            { status: 400 }
        )
    }
}
