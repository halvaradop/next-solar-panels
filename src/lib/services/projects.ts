import { ContactPerson, Project } from "@prisma/client"
import { getFetch } from "@/lib/utils"

/**
 * Fetches the user plants related to the given user id.
 *
 * @param {string} stakeHolderId - The user id.
 * @returns {Promise<ProjectsOnUsers[]>} - A promise that resolves to an array of ProjectsOnUsers.
 */
export const getContacPersonProjectsByStakeHolder = async <T extends unknown[] = (ContactPerson & Project)[]>(
    stakeHolderId: string
): Promise<T> => {
    const { data } = await getFetch<T>(`stakeholders/${stakeHolderId}`)
    return data
}

export const getProjects = async <T extends unknown[] = Project[]>(): Promise<T> => {
    const { data } = await getFetch<T>("projects")
    return data
}
