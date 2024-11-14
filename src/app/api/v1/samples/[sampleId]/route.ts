import { Params, ResponseAPI } from "@/lib/@types/types"
import { prisma } from "@/lib/prisma"
import { Samples } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

/**
 * Handle the GET request to retrieve a specific sample by its Id from the database.
 *
 * @param {NextRequest} request - The HTTP request created by the client
 * @param {Params<"sampleId">} params - The parameters received in the request
 * @returns {Promise<NextResponse>} - The HTTP response with the sample fetched
 */
export const GET = async (request: NextRequest, { params }: Params<"sampleId">): Promise<NextResponse> => {
    try {
        const sampleId = parseInt(params.sampleId)
        const sample = await prisma.samples.findUnique({
            where: {
                sampleId,
            },
        })
        if (!sample) {
            return NextResponse.json<ResponseAPI<{}>>({
                data: {},
                ok: false,
                message: "Sample not found.",
            })
        }
        return NextResponse.json<ResponseAPI<Samples>>({
            data: sample,
            ok: true,
            message: "Sample fetched successfully.",
        })
    } catch (error) {
        return NextResponse.json<ResponseAPI<{}>>({
            data: {},
            ok: false,
            message: "An error occurred while fetching the sample.",
        })
    }
}