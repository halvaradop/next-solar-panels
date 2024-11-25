import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Project } from "@prisma/client"
import { ResponseAPI } from "@/lib/@types/types"

/**
 * Handles the GET request to retrieve all plants from the database.
 *
 * @returns {Promise<NextResponse>} - The HTTP response containing the plants
 * retrieved from the database.
 * @example
 * ```ts
 * const response = await fetch("/api/v1/plants")
 * const data = await response.json()
 * ```
 */
export const GET = async (): Promise<NextResponse> => {
    try {
        const data = await prisma.project.findMany()
        return NextResponse.json<ResponseAPI<Project[]>>({
            data,
            ok: true,
            message: "The resource was retrieved successfully",
        })
    } catch (error) {
        return NextResponse.json<ResponseAPI<Project[]>>(
            {
                data: [],
                ok: false,
                message: "Failed to retrieve the project",
            },
            { status: 500 }
        )
    }
}

/**
 * Handle the POST request to create a new plant related to a specific user
 *
 * @param {NextRequest} request - The HTTP request data received with the new plant information.
 * @returns {Promise<NextResponse>} - HTTP response with the new plant created.
 * @example
 * ```ts
 * const response = await fetch("/api/v1/users/{userId}/plants", {
 *   method: "POST",
 *   body: JSON.stringify({
 *     plantName: "Plant Name",
 *     latitude: 1,
 *     longitude: 1,
 *   }),
 * })
 * const data = await response.json()
 * ```
 */
export const POST = async (request: NextRequest): Promise<NextResponse> => {
    try {
        const response = await request.json()
        const { name, latitude, longitude, user } = response
        if (!user) {
            return NextResponse.json<ResponseAPI<{}>>({
                data: {},
                ok: false,
                message: "user id was not sent",
            })
        }
        const userId = user

        const existcoordinates = await prisma.project.findFirst({
            where: {
                latitude,
                longitude,
            },
        })

        if (existcoordinates) {
            return NextResponse.json<ResponseAPI<{}>>({
                data: {},
                ok: false,
                message: "A project with the specified coordinates already exists.",
            })
        }
        const client = await prisma.client.findFirst({
            where: {
                projects: {
                    some: {
                        projectsOnUsers: {
                            some: {
                                userId,
                            },
                        },
                    },
                },
            },
        })
        const data = await prisma.project.create({
            data: {
                name,
                clientsId: client?.clientId ?? "",
                latitude,
                longitude,
                projectsOnUsers: {
                    create: {
                        userId,
                    },
                },
            },
        })

        return NextResponse.json<ResponseAPI<Project>>({
            data,
            ok: true,
            message: "The resource was created successfuly",
        })
    } catch (error) {
        return NextResponse.json<ResponseAPI<{}>>(
            {
                data: {},
                ok: false,
                message: "Failed to create the project",
            },
            { status: 500 }
        )
    }
}
