import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Plants, Zones } from "@prisma/client"
import { Params, ResponseAPI } from "@/lib/@types/types"
import { request } from "http"

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
        const data = await prisma.zones.findMany({
            where: {
                plant: {
                    companyId: company?.companyId,
                },
            },
            include: {
                plant: {
                    select: {
                        plantName: true,
                    },
                },
            },
        })
        return NextResponse.json<ResponseAPI<Zones[]>>({
            data,
            ok: true,
        })
    } catch (error) {
        return NextResponse.json<ResponseAPI<Zones[]>>({ data: [], ok: true }, { status: 404 })
    }
}
