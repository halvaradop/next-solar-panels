import { ResponseAPI } from "@/lib/@types/types"
import { prisma } from "@/lib/prisma"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

/**
 * Handler for the GET request to retrieve the project token from cookies.
 *
 * @param {NextRequest} request - The incoming request object.
 * @returns {Promise<NextResponse>} A promise that resolves to a JSON response containing the token.
 */
export const GET = async (request: NextRequest): Promise<NextResponse> => {
    try {
        const onlyCookies = await cookies()
        const token = onlyCookies.get("token")

        return NextResponse.json<ResponseAPI<{}>>({
            data: { token },
            message: "Project token retrieved",
            ok: true,
        })
    } catch (error) {
        return NextResponse.json<ResponseAPI<null>>({
            data: null,
            message: "Project token not found",
            ok: false,
        })
    }
}

/**
 * Handles the POST request to set a project token in cookies.
 *
 * @param {NextRequest} request - The incoming request object.
 * @returns {Promise<NextResponse>} - The response object containing a success message.
 */
export const POST = async (request: NextRequest): Promise<NextResponse> => {
    try {
        const response = await request.json()
        const onlyCookies = await cookies()
        const { idProject } = response

        const stakeholder = await prisma.project.findFirst({
            where: {
                idProject,
            },
            select: {
                idStakeholder: true,
            },
        })

        onlyCookies.set("token", JSON.stringify({ idProject, idStakeholder: stakeholder?.idStakeholder }), {
            httpOnly: true,
        })

        return NextResponse.json<ResponseAPI<{}>>({
            data: {},
            message: "Project token set",
            ok: true,
        })
    } catch (error) {
        return NextResponse.json<ResponseAPI<null>>({
            data: null,
            message: "Project token not set",
            ok: false,
        })
    }
}
