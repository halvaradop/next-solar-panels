import { ResponseAPI } from "@/lib/@types/types"
import { prisma } from "@/lib/prisma"
import { Companies } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (request: NextRequest): Promise<NextResponse> => {
    try {
        const response = await request.json()

        const { companyName, email, phone } = response

        const existEmail= await prisma.companies.findFirst({
            where: {email},

        });
        
        if (existEmail){
            return NextResponse.json<ResponseAPI<{}>>(
               { data:{},
                ok:false,
                message:"This email is already registered"}
            )
            
        }
        const data = await prisma.companies.create({
            data: {
                companyName,
                email,
                PhoneCompanies: {
                    create: {
                        phoneNumber: parseInt(phone),
                    },
                },
            },
            include: {
                PhoneCompanies: true,
            },
        })

        return NextResponse.json<ResponseAPI<Companies>>({
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
