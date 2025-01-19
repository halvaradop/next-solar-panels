"use server"
import { PositionData, Project } from "@/lib/@types/models"
import { GetFieldsByProjectId, GetProjectsById } from "@/lib/@types/types"
import { getFetch } from "@/lib/utils"

/**
 * Retrieves all projects from the database.
 *
 * @returns {Promise<Project[]>} - The projects retrieved from the database.
 */
export const getProjects = async (): Promise<Project[]> => {
    "use cache"
    const { data } = await getFetch<Project[]>("projects")
    return data
}

/**
 * Retrieves a project by its unique identifier.
 *
 * @param {string} idProject - The unique identifier of the project to retrieve.
 */
export const getProjectsById: GetProjectsById = async (idProject: string) => {
    "use cache"
    // @ts-expect-error
    return await prisma.project.findUnique({
        where: {
            idProject,
        },
        include: {
            field: true,
            address: true,
            contactPerson: true,
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
    // @ts-expect-error
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
    // @ts-expect-error
    return await prisma.positionData.findMany({
        where: {
            field: {
                idProject,
            },
        },
    })
}
