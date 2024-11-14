import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Params, ResponseAPI, UsersResponse } from "@/lib/@types/types"

export const GET = async (request: NextRequest, { params }: Params<"userId">): Promise<NextResponse> => {
    try {
        const userId = parseInt(params.userId)
        const data = await prisma.users.findUnique({
            where: {
                userId,
            },
            select: {
                userId: true,
                email: true,
                firstName: true,
                lastName: true,
                role: true,
                UserPlants: {
                    select: {
                        plant: {
                            select: {
                                company: {
                                    select: {
                                        companyId: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        })
        if (!data) {
            return NextResponse.json<ResponseAPI<UsersResponse>>(
                {
                    data: {} as UsersResponse,
                    ok: false,
                    message: "Failed to retrieve zones",
                },
                { status: 404 }
            )
        }
        return NextResponse.json<ResponseAPI<UsersResponse>>({
            data,
            ok: true,
            message: "The resource was retrieved successfuly",
        })
    } catch (error) {
        return NextResponse.json<ResponseAPI<UsersResponse>>(
            {
                data: {} as UsersResponse,
                ok: false,
                message: "Failed to retrieve zones",
            },
            { status: 404 }
        )
    }
}
