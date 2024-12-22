import { Params, ResponseAPI } from "@/lib/@types/types"
import { prisma } from "@/lib/prisma"
import { ContactPerson } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (request: NextRequest, { params }: Params<"idRole">): Promise<NextResponse> => {
    try {
        const idRole = (await params).idRole
        const data = await prisma.contactPerson.findMany({
            where: {
                idRole: parseInt(idRole),
            },
        })
        return NextResponse.json<ResponseAPI<ContactPerson[]>>({
            data,
            ok: true,
            message: "Contact people retrieved successfully",
        })
    } catch {
        return NextResponse.json<ResponseAPI<ContactPerson[]>>(
            {
                data: [],
                ok: false,
                message: "Failed to retrieve contact people",
            },
            { status: 400 }
        )
    }
}
