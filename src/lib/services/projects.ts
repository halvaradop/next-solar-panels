import { Project, ProjectsOnUsers, User } from "@prisma/client"
import { getFetch } from "@/lib/utils"

/**
 * Fetches the user plants related to the given user id.
 *
 * @param {string} clientId - The user id.
 * @returns {Promise<ProjectsOnUsers[]>} - A promise that resolves to an array of ProjectsOnUsers.
 */
export const getUserProjectsByClients = async <T extends unknown[] = (User & Project)[]>(clientId: string): Promise<T> => {
    const { data } = await getFetch<T>(`clients/${clientId}`)
    return data
}
