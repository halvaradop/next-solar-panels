import { ResponseAPI } from "@/lib/@types/types"
import { prisma } from "@/lib/prisma"
import { Users } from "@prisma/client"
import { NextResponse } from "next/server"

export const GET = async (): Promise<NextResponse> => {
    try {
        const data = await prisma.users.findMany()
        return NextResponse.json<ResponseAPI<Users[]>>({
            data,
            ok: true,
            message: "The resource was retrieved successfuly",
        })
    } catch (error) {
        return NextResponse.json<ResponseAPI<Users[]>>(
            {
                data: [],
                ok: false,
                message: "Failed companies",
            },
            { status: 404 }
        )
    }
}
