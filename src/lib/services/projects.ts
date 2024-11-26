import { ProjectsOnUsers } from "@prisma/client"
import { getFetch } from "@/lib/utils"

/**
 * Fetches the user project related to the given user id.
 *
 * @param {string} userId - The user id.
 * @returns {Promise<ProjectsOnUsers[]>} - A promise that resolves to an array of ProjectsOnUsers.
 */
export const getUserProjectsByClients = async <T extends unknown[] = ProjectsOnUsers[]>(clientId: string): Promise<T> => {
    const { data } = await getFetch<T>(`clients/${clientId}`)
    return data
}
