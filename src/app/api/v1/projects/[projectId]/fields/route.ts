import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Field } from "@prisma/client"
import { Params, ResponseAPI } from "@/lib/@types/types"

export const GET = async (request: NextRequest, { params }: Params<"projectId">): Promise<NextResponse> => {
    try {
        const projectId = (await params).projectId
        const data = await prisma.field.findMany({
            where: {
                idProject: projectId,
            },
            include: {
                project: true,
                address: true,
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
