import { NextRequest, NextResponse } from "next/server"
import { Params, ResponseAPI } from "@/lib/@types/types"
import { prisma } from "@/lib/prisma"
import { PositionMeasurement } from "@prisma/client"

/**
 * Handler for retrieving position measurements of a specific stakeholder.
 *
 * @param {NextRequest} request - The incoming request object.
 * @param {Params<"stakeholderId">} params - The route parameters containing the stakeholder ID.
 * @returns {Promise<NextResponse>} A response containing the position measurements of the stakeholder.
 * @example
 * ```ts
 * const request = await fetch("{domain}/api/v1/stake-holders/{stakeholderId}/position-measurements")
 * const data = await request.json()
 * ```
 */
export const GET = async (request: NextRequest, { params }: Params<"stakeholderId">): Promise<NextResponse> => {
    try {
        const idStakeholder = (await params).stakeholderId
        const data = await prisma.positionMeasurement.findMany({
            where: {
                contactPerson: {
                    stakeHolder: {
                        some: {
                            idStakeHolder: idStakeholder,
                        },
                    },
                },
            },
        })
        return NextResponse.json<ResponseAPI<PositionMeasurement[]>>({
            data,
            message: "Stakeholder position measurements retrieved successfully",
            ok: true,
        })
    } catch {
        return NextResponse.json<ResponseAPI<null>>({
            data: null,
            message: "Error to retrieve stakeholder position measurements",
            ok: false,
        })
    }
}
