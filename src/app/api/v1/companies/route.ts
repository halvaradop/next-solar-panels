import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Companies } from "@prisma/client"
import { ResponseAPI } from "@/lib/@types/types"

/**
 * Handle the GET request to retrieve all companies in the database.
 *
 * @returns {Promise<NextResponse>} - The HTTP response with the companies retrieved.
 * @example
 * ```ts
 * const response = await fetch("{domain}/api/v1/companies")
 * const data = await response.json()
 * ```
 */
export const GET = async (): Promise<NextResponse> => {
    try {
        const data = await prisma.companies.findMany({
            include: {
                PhoneCompanies: true,
            },
        })
        const map = data.map(({ PhoneCompanies, ...spread }) => ({
            phoneCompanies: PhoneCompanies,
            ...spread,
        }))

        return NextResponse.json<ResponseAPI<Companies[]>>({
            data: map,
            ok: true,
            message: "The resource was retrieved successfuly",
        })
    } catch (error) {
        return NextResponse.json<ResponseAPI<null>>(
            {
                data: null,
                ok: false,
                message: "Failed to retrieve companies",
            },
            { status: 500 }
        )
    }
}

/**
 * Handle the POST request to create a new company in the database.
 *
 * @param {NextRequest} request - The HTTP request data containing the new company information.
 * @returns {Promise<NextResponse>} - HTTP response with the newly created company or an error message.
 * @example
 * ```ts
 * const response = await fetch("{domain}/api/v1/companies", {
 *   method: "POST",
 *   body: JSON.stringify({
 *     companyName: "Company Name",
 *     email: "company@gmail.com"
 *     phone: "1234567890"
 *   }),
 * })
 * ```
 */
export const POST = async (request: NextRequest): Promise<NextResponse> => {
    try {
        const response = await request.json()
        const { companyName, email, phone } = response

        const existEmail = await prisma.companies.findFirst({
            where: { email },
        })

        if (existEmail) {
            return NextResponse.json<ResponseAPI<{}>>({
                data: {},
                ok: false,
                message: "This email is already registered",
            })
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
        return NextResponse.json<ResponseAPI<{}>>({
            data: {},
            ok: false,
            message: "Failed to create the company",
        })
    }
}
