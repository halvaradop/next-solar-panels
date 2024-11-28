import { Params, ResponseAPI } from "@/lib/@types/types"
import { prisma } from "@/lib/prisma"
import { Sample } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

/**
 * Handle the GET request to retrieve a specific sample by its Id from the database.
 *
 * @param {NextRequest} request - The HTTP request containing the request data.
 * @param {Params<"sampleId">} params - The dynamic parameter to extract the `sampleId`.
 * @returns {Promise<NextResponse>} - The HTTP response with the sample fetched.
 * @example
 * ```ts
 * const response = await fetch("/api/v1/samples/{sampleId}");
 * const data = await response.json();
 * ```
 */
export const GET = async (request: NextRequest, { params }: Params<"sampleId">): Promise<NextResponse> => {
    try {
        const sampleId = (await params).sampleId
        const sample = await prisma.sample.findUnique({
            where: {
                sampleId,
            },
            include: {
                zone: {
                    select: {
                        name: true,
                    },
                },
            },
        })
        if (!sample) {
            return NextResponse.json<ResponseAPI<{}>>({
                data: {},
                ok: false,
                message: "Sample not found.",
            })
        }
        return NextResponse.json<ResponseAPI<Sample>>({
            data: sample,
            ok: true,
            message: "Sample fetched successfully.",
        })
    } catch (error) {
        return NextResponse.json<ResponseAPI<{}>>({
            data: {},
            ok: false,
            message: "Failed to retrieve a specific sample.",
        })
    }
}
