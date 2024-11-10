import { NextRequest, NextResponse } from "next/server"
import { revalidateTag } from "next/cache"
import { prisma } from "@/lib/prisma"
import { Params, ResponseAPI, SampleRequest } from "@/lib/@types/types"
import { Plants } from "@prisma/client"

export const GET = async (request: NextRequest, { params }: Params<"userId">): Promise<NextResponse> => {
    try {
        const userId = parseInt(params.userId)
        const companyId = await prisma.companies.findFirst({
            where: {
                Plants: {
                    some: {
                        EmployeePlants: {
                            some: {
                                userId,
                            },
                        },
                    },
                },
            },
        })
        const data = await prisma.companies.findMany({
            where: {
                companyId: companyId?.companyId,
            },
        })
        console.log(data)

        return NextResponse.json<ResponseAPI<Plants[]>>({ data: [], ok: true })
    } catch (error) {
        return NextResponse.json<ResponseAPI<Plants[]>>(
            {
                data: [],
                ok: false,
                message: "Failed to retrieve samples related to the employee",
            },
            { status: 404 }
        )
    }
}
