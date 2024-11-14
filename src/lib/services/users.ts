import { Users } from "@prisma/client"
import { getFetch } from "@/lib/utils"

/**
 * TODO: migrate the `getUserByCompany` function to the `company` module.
 *
 * Fetches all users associated with a specific company from the database
 * @param {number} userId - The ID of the user whose company users are to be fetched
 * @returns {Promise<Users[]>} - A promise that resolves to a list of users
 */
export const getUserByCompany = async (userId: number): Promise<Users[]> => {
    const { data } = await getFetch<Users[]>(`users/${userId}/users`)
    return data
}

/**
 * Fetches all users from the database
 *
 * @returns {Promise<Users[]>} - A list of users
 */
export const getUsers = async (): Promise<Users[]> => {
    const { data } = await getFetch<Users[]>(`users`)
    return data
}
