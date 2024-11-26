import { ResponseAPI } from "@/lib/@types/types"
import { prisma } from "@/lib/prisma"
import { Address } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (request: NextRequest): Promise<NextResponse> => {
    try {
        const response = await request.json()
        const { country, state, city, postbox, street, number, isActive } = response

        const data = await prisma.address.create({
            data: {
                country,
                state,
                city,
                postbox,
                street,
                number,
                isActive,
            },
        })

        return NextResponse.json<ResponseAPI<Address>>({
            data,
            ok: true,
            message: "The resource was created successfuly",
        })
    } catch (error) {
        return NextResponse.json<ResponseAPI<{}>>({
            data: {},
            ok: false,
            message: "Failed to create the client",
        })
    }
}
