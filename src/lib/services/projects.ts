import { ProjectsOnUsers } from "@prisma/client"
import { getFetch } from "@/lib/utils"

/**
 * Fetches the user plants related to the given user id.
 *
 * @param {number} userId - The user id.
 * @returns {Promise<ProjectsOnUsers[]>} - A promise that resolves to an array of ProjectsOnUsers.
 */
export const getUserProjectsByClients = async <T extends unknown[] = ProjectsOnUsers[]>(userId: number): Promise<T> => {
    const { data } = await getFetch<T>(`companies/${userId}`)
    return data
}