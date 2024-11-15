import { UserPlants } from "@prisma/client"
import { getFetch } from "@/lib/utils"

/**
 * Fetches the user plants related to the given user id.
 *
 * @param {number} userId - The user id.
 * @returns {Promise<UserPlants[]>} - A promise that resolves to an array of UserPlants.
 */
export const getUserPlantByCompany = async <T extends unknown[] = UserPlants[]>(userId: number): Promise<T> => {
    const { data } = await getFetch<T>(`companies/${userId}`)
    return data
}
