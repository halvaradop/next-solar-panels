import { NextRequest, NextResponse } from "next/server"
import { revalidateTag } from "next/cache"
import { prisma } from "@/lib/prisma"
import { Params, ResponseAPI } from "@/lib/@types/types"
import { Companies, Plants } from "@prisma/client"
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
        const data = await prisma.plants.findMany({
            where: {
                companyId: company?.companyId,
            },
        })
        return NextResponse.json<ResponseAPI<Plants[]>>({
            data,
            ok: true,
        })
    } catch (error) {
        return NextResponse.json<ResponseAPI<Plants[]>>({ data: [], ok: true }, { status: 404 })
    }
}
