import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { UserPlants } from "@prisma/client"
import { ResponseAPI } from "@/lib/@types/types"

export const POST = async (request: NextRequest): Promise<NextResponse> => {
    try {
        const response = await request.json()
        const { user, plant } = response
        const existUser = await prisma.userPlants.findFirst({
            where: { plantId: parseInt(plant), userId: parseInt(user) },
        })

        if (existUser) {
            return NextResponse.json<ResponseAPI<{}>>({
                data: {},
                ok: false,
                message: "This user is assigned to this plant",
            })
        }
        const data = await prisma.userPlants.create({
            data: {
                plantId: parseInt(plant),
                userId: parseInt(user),
            },
        })

        return NextResponse.json<ResponseAPI<UserPlants>>({
            data,
            ok: true,
            message: "The resource was created successfuly",
        })
    } catch (error) {
        return NextResponse.json<ResponseAPI<{}>>({
            data: {},
            ok: false,
            message: "Failed to create the plant to user",
        })
    }
}
