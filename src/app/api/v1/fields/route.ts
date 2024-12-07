import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Field } from "@prisma/client"
import { ResponseAPI } from "@/lib/@types/types"

/**
 * Handle the GET request to retrieve all fields from the database.
 *
 * @returns {Promise<NextResponse>} - HTTP response containing all fields.
 * @example
 * ```ts
 * const response = await fetch("{domain}/api/v1/fields")
 * const data = await response.json()
 * ```
 */
export const GET = async (): Promise<NextResponse> => {
    try {
        const data = await prisma.field.findMany()
        return NextResponse.json<ResponseAPI<Field[]>>({
            data,
            ok: true,
            message: "The resource was retrieved successfully",
        })
    } catch (error) {
        return NextResponse.json<ResponseAPI<Field[]>>(
            {
                data: [],
                ok: false,
                message: "Failed to retrieve fields",
            },
            { status: 400 }
        )
    }
}
/**
 * Handle the POST request to create a new field in the database.
 *
 * @param {NextRequest} request - The HTTP request containing the information of the new field.
 * @returns {Promise<NextResponse>} - HTTP response with the newly created field.
 * @example
 * ```ts
 * const response = await fetch("{domain}/api/v1/fields", {
 *   method: "POST",
 *   body: JSON.stringify({
 *     idAddress: 0,
 *     fence: false,
 *     connectionEarthingFence: false,
 *     externalCurrentInfluence: false,
 *   })
 * })
 * const data = await response.json()
 * ```
 */
export const POST = async (request: NextRequest): Promise<NextResponse> => {
    try {
        const requestData = await request.json()

        const newField = await prisma.field.create({
            data: requestData,
        })
        return NextResponse.json<ResponseAPI<Field>>({
            data: newField,
            ok: true,
            message: "The field was created successfully",
        })
    } catch (error) {
        return NextResponse.json<ResponseAPI<{}>>({
            data: {},
            ok: false,
            message: "Failed to create new field",
        })
    }
}
