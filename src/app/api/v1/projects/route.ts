import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Project } from "@prisma/client"
import { ResponseAPI } from "@/lib/@types/types"

/**
 * Handles the GET request to retrieve all projects from the database.
 *
 * @returns {Promise<NextResponse>} - The HTTP response containing the projects
 * retrieved from the database.
 * @example
 * ```ts
 * const response = await fetch("{domain}/api/v1/projects")
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
 * const response = await fetch("{domain}/api/v1/projects", {
 *   method: "POST",
 *   body: JSON.stringify({
 *     idContactPerson: 1,
 *     idStakeholder: 1,
 *     idAddress: 1,
 *     designation: "Allianz Arena",
 *   }),
 * })
 * const data = await response.json()
 * ```
 */
export const POST = async (request: NextRequest): Promise<NextResponse> => {
    try {
        const { name, latitude, longitude, userId, contactPerson, idStakeholder, ...spread } = await request.json()
        const data = await prisma.project.create({
            data: {
                designation: name,
                contactPerson: {
                    connect: { idContactPerson: contactPerson },
                },
                stakeholder: {
                    connect: { idStakeHolder: idStakeholder },
                },
                address: {
                    create: {
                        ...spread,
                        latitude: parseFloat(latitude),
                        longitude: parseFloat(longitude),
                    },
                },
            },
            include: {
                address: true,
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
            { status: 400 }
        )
    }
}
