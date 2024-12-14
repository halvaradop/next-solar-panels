import { NextRequest, NextResponse } from "next/server"
import { Params, ResponseAPI } from "@/lib/@types/types"
import { prisma } from "@/lib/prisma"
import { PositionSoilData } from "@prisma/client"

/**
 * Handler for retrieving position soil datas of a specific stakeholder.
 *
 * @param {NextRequest} request - The incoming request object.
 * @param {Params<"stakeholderId">} params - The route parameters containing the stakeholder ID.
 * @returns {Promise<NextResponse>} A response containing the position soil datas of the stakeholder.
 * @example
 * ```ts
 * const request = await fetch("{domain}/api/v1/stake-holders/{stakeholderId}/position-soil-datas")
 * const data = await request.json()
 * ```
 */
export const GET = async (request: NextRequest, { params }: Params<"stakeholderId">): Promise<NextResponse> => {
    try {
        const idStakeholder = (await params).stakeholderId
        const data = await prisma.positionSoilData.findMany({
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
        return NextResponse.json<ResponseAPI<PositionSoilData[]>>({
            data,
            message: "Stakeholder position soil datas retrieved successfully",
            ok: true,
        })
    } catch (error) {
        return NextResponse.json<ResponseAPI<null>>({
            data: null,
            message: "Error to retrieve stakeholder position soil datas",
            ok: false,
        })
    }
}
