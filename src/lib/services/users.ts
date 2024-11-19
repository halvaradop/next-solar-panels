import { Sample, User } from "@prisma/client"
import { getFetch } from "@/lib/utils"
import { UserSession } from "@/lib/@types/types"

/**
 * Fetches all users from the database
 *
 * @returns {Promise<User[]>} - A list of users
 */
export const getUsers = async <T extends unknown[] = User[]>(): Promise<T> => {
    const { data } = await getFetch<T>("users")
    return data
}

/**
 * Fetches a specific user from the database by their id.
 *
 * @param {number} userId - The user id to get the user from the database
 * @returns {Promise<UserSession>} - A user object
 */
export const getUserById = async <T extends object = UserSession>(userId: number): Promise<T> => {
    const { data } = await getFetch<T>(`users/${userId}`)
    return data
}

/**
 * Fetches the sample data associated with a specific user from the database.
 *
 * @param {number} userId - The user id to get the samples related to them from the database
 * @returns {Promise<Sample[]>} - A list of samples related to the user
 */
export const getSamplesByUser = async <T extends unknown[] = Sample[]>(userId: number): Promise<T> => {
    const { data } = await getFetch<T>(`users/${userId}/samples`)
    return data
}
