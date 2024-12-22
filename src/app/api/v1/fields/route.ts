import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Field } from "@prisma/client"
import { ResponseAPI } from "@/lib/@types/types"

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
        const json = await request.json()
        const { designation, fence, connectionEarthingFence, externalCurrentInfluence, project, longitude, latitude, ...rest } =
            json

        const fenceBoolean = !!fence
        const connectionEarthingFenceBoolean = !!connectionEarthingFence
        const externalCurrentInfluenceBoolean = !!externalCurrentInfluence

        const newField = await prisma.field.create({
            data: {
                designation,
                fence: fenceBoolean,
                connectionEarthingFence: connectionEarthingFenceBoolean,
                externalCurrentInfluence: externalCurrentInfluenceBoolean,
                project: {
                    connect: {
                        idProject: project,
                    },
                },
                address: {
                    create: {
                        latitude: parseFloat(latitude),
                        longitude: parseFloat(longitude),
                        ...rest,
                    },
                },
            },
        })

        return NextResponse.json<ResponseAPI<Field>>({
            data: newField,
            ok: true,
            message: "The field was created successfully",
        })
    } catch {
        return NextResponse.json<ResponseAPI<{}>>({
            data: {},
            ok: false,
            message: "Failed to create new field",
        })
    }
}
