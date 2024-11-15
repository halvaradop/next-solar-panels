import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { UserPlants } from "@prisma/client"
import { ResponseAPI } from "@/lib/@types/types"

/**
 * Handle the POST request to assign a plant to a user
 *
 * @param {NextRequest} request - The HTTP request data containing the user and plant id
 * @returns {Promise<NextResponse>} - HTTP response containing the created userPlant
 */
export const POST = async (request: NextRequest): Promise<NextResponse> => {
    try {
        const response = await request.json()
        const { user, plant } = response
        const userId = parseInt(user)
        const plantId = parseInt(plant)
        const existUser = await prisma.userPlants.findFirst({
            where: {
                plantId,
                userId,
            },
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
                plantId,
                userId,
            },
        })

        return NextResponse.json<ResponseAPI<UserPlants>>({
            data,
            ok: true,
            message: "The resource was created successfully",
        })
    } catch (error) {
        return NextResponse.json<ResponseAPI<{}>>({
            data: {},
            ok: false,
            message: "Failed to create the plant to user",
        })
    }
}
