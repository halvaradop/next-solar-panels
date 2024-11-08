import { Params } from "@/lib/@types/types"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (_: unknown, { params }: Params<"userId">): Promise<NextResponse> => {
    return NextResponse.json({
        userId: params.userId,
    })
}
