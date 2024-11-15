import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { UserPlants } from "@prisma/client"
import { Params, ResponseAPI } from "@/lib/@types/types"

/**
 * TODO: add documentation
 *
 * @param {NextRequest} request -
 * @param {Params<"companyId">} param1 -
 * @returns {Promise<NextResponse>} -
 */
export const GET = async (request: NextRequest, { params }: Params<"companyId">): Promise<NextResponse> => {
    try {
        const companyId = parseInt(params.companyId)
        const data = await prisma.userPlants.findMany({
            where: {
                plant: {
                    companyId,
                },
            },
            include: {
                user: true,
                plant: true,
            },
        })
        return NextResponse.json<ResponseAPI<UserPlants[]>>({
            data,
            ok: true,
        })
    } catch (error) {
        return NextResponse.json<ResponseAPI<UserPlants[]>>(
            {
                data: [],
                ok: false,
                message: "Failed to retrieve the users",
            },
            { status: 404 }
        )
    }
}
