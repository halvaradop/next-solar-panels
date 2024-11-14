import { Params, ResponseAPI } from "@/lib/@types/types"
import { prisma } from "@/lib/prisma"
import { Companies, Users } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (request: NextRequest): Promise<NextResponse> => {
    try {
        const response = await request.json()
        const { firstName, email, phone, lastName, password, rol } = response

        const existEmail= await prisma.users.findFirst({
            where: {email},

        });
        
        if (existEmail){
            return NextResponse.json<ResponseAPI<{}>>(
               { data:{},
                ok:false,
                message:"This email is already registered"}
            )
            
        }
        const data = await prisma.users.create({
            data: {
                firstName,
                email,
                lastName,
                password,
                roleId: parseInt(rol),
                PhoneUsers: {
                    create: {
                        phoneNumber: parseInt(phone),
                    },
                },
            },
            include: {
                PhoneUsers: true,
            },
        })

        return NextResponse.json<ResponseAPI<Users>>({
            data,
            ok: true,
            message: "The resource was created successfuly",
        })
    } catch (error) {
        console.error("Error creating company and phone:", error)
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
        const data = await prisma.users.findMany({
            where: {
                UserPlants: {
                    some: {
                        plant: {
                            companyId: company?.companyId,
                        },
                    },
                },
            },
        })
        return NextResponse.json<ResponseAPI<Users[]>>({
            data,
            ok: true,
        })
    } catch (error) {
        return NextResponse.json<ResponseAPI<Users[]>>({ data: [], ok: true }, { status: 404 })
    }
}
