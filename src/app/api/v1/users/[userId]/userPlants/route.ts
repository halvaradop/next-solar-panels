import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { UserPlants, Users } from "@prisma/client"
import { Params, ResponseAPI } from "@/lib/@types/types"

export const GET = async (request: NextRequest, { params }: Params<"userId">): Promise<NextResponse> => {
    try {
        const userId = parseInt(params.userId)
        const company = await prisma.companies.findFirst({
            where: {
                Plants: {
                    some: {
                        UserPlants: {
                            some: {
                                userId: userId,
                            },
                        },
                    },
                },
            },
        })
        const data = await prisma.userPlants.findMany({
            where: {
                plant: {
                    companyId: company?.companyId,
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
