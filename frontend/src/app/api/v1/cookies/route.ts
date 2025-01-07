import { ResponseAPI } from "@/lib/@types/types"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

/**
 * Handler for the GET request to retrieve the Token from cookies.
 *
 * @returns {Promise<NextResponse>} A promise that resolves to a JSON response containing the token.
 * @unstable
 * @deprecated
 */
export const GET = async (): Promise<NextResponse> => {
    try {
        const session = await auth()
        const cookie = await prisma.cookieToken.findFirst({
            where: {
                idContactPerson: session?.user.id,
            },
        })

        if (!cookie) {
            return NextResponse.json<ResponseAPI<null>>({
                data: null,
                message: "Token not found",
                ok: false,
            })
        }

        return NextResponse.json<ResponseAPI<{}>>({
            data: cookie,
            message: "Token retrieved",
            ok: true,
        })
    } catch {
        return NextResponse.json<ResponseAPI<null>>({
            data: null,
            message: "Token not found",
            ok: false,
        })
    }
}

/**
 * Handles the POST request to set a token in cookies.
 *
 * @param {NextRequest} request - The incoming request object.
 * @returns {Promise<NextResponse>} - The response object containing a success message.
 * @unstable
 * @deprecated
 */
export const POST = async (request: NextRequest): Promise<NextResponse> => {
    try {
        const response = await request.json()
        const { idProject, idContactPerson } = response

        const stakeholder = await prisma.project.findFirst({
            where: {
                idProject,
            },
            select: {
                idStakeholder: true,
            },
        })

        if (!stakeholder) {
            return NextResponse.json<ResponseAPI<null>>({
                data: null,
                message: "Stakeholder not found",
                ok: false,
            })
        }
        const storeToken = await prisma.cookieToken.findFirst({
            where: {
                idContactPerson,
            },
            select: {
                id: true,
            },
        })
        if (storeToken) {
            await prisma.cookieToken.update({
                where: {
                    id: storeToken.id,
                },
                data: {
                    idProject,
                },
            })
        } else {
            await prisma.cookieToken.create({
                data: {
                    idProject,
                    idStakeHolder: stakeholder?.idStakeholder,
                    idContactPerson,
                },
            })
        }

        return NextResponse.json<ResponseAPI<{}>>({
            data: {},
            message: "Project token set",
            ok: true,
        })
    } catch {
        return NextResponse.json<ResponseAPI<null>>({
            data: null,
            message: "Project token not set",
            ok: false,
        })
    }
}
