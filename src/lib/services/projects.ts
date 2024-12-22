"use server"
import { PositionData, Project } from "@prisma/client"
import { prisma } from "@/lib/prisma"
import { GetFieldsByProjectId, GetProjectsById } from "@/lib/@types/types"

/**
 * Retrieves all projects from the database.
 *
 * @returns {Promise<Project[]>} - The projects retrieved from the database.
 */
export const getProjects = async (): Promise<Project[]> => {
    "use cache"
    return await prisma.project.findMany()
}

/**
 * Retrieves a project by its unique identifier.
 *
 * @param {string} idProject - The unique identifier of the project to retrieve.
 */
export const getProjectsById: GetProjectsById = async (idProject: string) => {
    "use cache"
    return await prisma.project.findUnique({
        where: {
            idProject,
        },
        include: {
            address: true,
            contactPerson: true,
            field: true,
        },
    })
}

/**
 * Retrieves fields associated with a given project ID.
 *
 * @param {string} idProject - The ID of the project to retrieve fields for.
 */
export const getFieldsByProjectsId: GetFieldsByProjectId = async (idProject: string) => {
    "use cache"
    return await prisma.field.findMany({
        where: {
            idProject,
        },
        include: {
            project: true,
            address: true,
        },
    })
}

/**
 * Retrieves position data associated with a specific project ID.
 *
 * @param {string} idProject - The unique identifier of the project.
 * @returns {PositionData[]} A promise that resolves to an array of PositionData objects.
 */
export const getPositionDatasByProjectId = async (idProject: string): Promise<PositionData[]> => {
    "use cache"
    return await prisma.positionData.findMany({
        where: {
            field: {
                idProject,
            },
        },
    })
}
