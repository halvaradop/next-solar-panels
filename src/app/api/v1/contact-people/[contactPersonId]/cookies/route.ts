import { Params, ResponseAPI } from "@/lib/@types/types"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (request: NextRequest, { params }: Params<"contactPersonId">) => {
    const response = await request.json()
    const { idProject } = response

    const onlyCookies = await cookies()
    onlyCookies.set("project-token", idProject, {
        httpOnly: true,
    })

    return NextResponse.json<ResponseAPI<{}>>({
        data: {},
        message: "Project token set",
        ok: true,
    })
}
