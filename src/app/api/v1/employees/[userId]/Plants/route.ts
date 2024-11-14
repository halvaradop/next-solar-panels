import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Plants } from "@prisma/client"
import { Params, ResponseAPI } from "@/lib/@types/types"

export const POST = async (request: NextRequest): Promise<NextResponse> => {
    try {
        const userId = parseInt("0")
        const response = await request.json()
        const { plantName, latitude, longitude } = response

        const existcoordinates = await prisma.plants.findFirst({
            where: {
                latitude,
                longitude,
            },
        })

        if (existcoordinates) {
            return NextResponse.json<ResponseAPI<{}>>({
                data: {},
                ok: false,
                message: "There is already a plant with those coordinates",
            })
        }
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
        const data = await prisma.plants.create({
            data: {
                plantName,
                companyId: company?.companyId ?? 0,
                latitude,
                longitude,
            },
        })

        return NextResponse.json<ResponseAPI<Plants>>({
            data,
            ok: true,
            message: "The resource was created successfuly",
        })
    } catch (error) {
        return NextResponse.json<ResponseAPI<{}>>({
            data: {},
            ok: false,
            message: "Failed ",
        })
    }
}

export const GET = async (request: NextRequest, { params }: Params<"userId">): Promise<NextResponse> => {
    try {
        const userId = parseInt(params.userId)
        const data = await prisma.companies
            .findMany({
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
                include: {
                    Plants: true,
                },
            })
            .then((companies) => companies.flatMap((companies) => companies.Plants))
        return NextResponse.json<ResponseAPI<Plants[]>>({
            data,
            ok: true,
        })
    } catch (error) {
        return NextResponse.json<ResponseAPI<Plants[]>>({ data: [], ok: true }, { status: 404 })
    }
}
