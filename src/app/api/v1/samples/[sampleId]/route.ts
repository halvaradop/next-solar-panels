import { Params, ResponseAPI } from "@/lib/@types/types"
import { prisma } from "@/lib/prisma"
import { Samples } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

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
