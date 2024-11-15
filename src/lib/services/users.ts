import { Samples, Users } from "@prisma/client"
import { getFetch } from "@/lib/utils"
import { UsersResponse } from "../@types/types"

/**
 * Fetches all users from the database
 *
 * @returns {Promise<Users[]>} - A list of users
 */
export const getUsers = async (): Promise<Users[]> => {
    const { data } = await getFetch<Users[]>("users")
    return data
}

/**
 * Fetches a specific user from the database by their id.
 *
 * @param {number} userId - The user id to get the user from the database
 * @returns {Promise<UsersResponse>} - A user object
 */
export const getUserById = async (userId: number): Promise<UsersResponse> => {
    const { data } = await getFetch<UsersResponse>(`users/${userId}`)
    return data
}

/**
 * Fetches the sample data associated with a specific user from the database.
 *
 * @param {number} userId - The user id to get the samples related to them from the database
 * @returns {Promise<Samples[]>} - A list of samples related to the user
 */
export const getSamplesByUser = async (userId: number): Promise<Samples[]> => {
    const { data } = await getFetch<Samples[]>(`users/${userId}/samples`)
    return data
}
