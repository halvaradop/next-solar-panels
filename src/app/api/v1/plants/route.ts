import { Plants } from "@prisma/client"
import { NextResponse } from "next/server"
import { ResponseAPI } from "@/lib/@types/types"
import { prisma } from "@/lib/prisma"

export const GET = async (): Promise<NextResponse> => {
    try {
        const data = await prisma.plants.findMany()
        return NextResponse.json<ResponseAPI<Plants[]>>({
            data,
            ok: true,
            message: "The resource was retrieved successfuly",
        })
    } catch (error) {
        return NextResponse.json<ResponseAPI<Plants[]>>(
            {
                data: [],
                ok: false,
                message: "Failed to retrieve the samples",
            },
            { status: 404 }
        )
    }
}
