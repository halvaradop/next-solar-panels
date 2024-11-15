import { UserPlants } from "@prisma/client"
import { getFetch } from "@/lib/utils"

/**
 * Fetches the user plants related to the given user id.
 *
 * @param {number} userId - The user id.
 * @returns {Promise<UserPlants[]>} - A promise that resolves to an array of UserPlants.
 */
export const getUserPlantByCompany = async (userId: number): Promise<UserPlants[]> => {
    const { data } = await getFetch<UserPlants[]>(`companies/${userId}`)
    return data
}
