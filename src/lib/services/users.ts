import { ProjectsOnUsers, Sample, User } from "@prisma/client"
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
 * @param {string} userId - The user id to get the user from the database
 * @returns {Promise<UserSession>} - A user object
 */
export const getUserById = async <T extends object = UserSession>(userId: string): Promise<T> => {
    const { data } = await getFetch<T>(`users/${userId}`)
    return data
}

/**
 * Fetches the sample data associated with a specific user from the database.
 *
 * @param {string} userId - The user id to get the samples related to them from the database
 * @returns {Promise<Sample[]>} - A list of samples related to the user
 */
export const getSamplesByUser = async <T extends unknown[] = Sample[]>(userId: string): Promise<T> => {
    const { data } = await getFetch<T>(`users/${userId}/samples`)
    return data
}

/**
 * Fetches all users and projects from the database
 *
 * @returns {Promise<ProjectsOnUsers[]>} - A list of projects related to the user
 */
export const getUserOnProjects = async <T extends unknown[] = ProjectsOnUsers[]>(): Promise<T> => {
    const { data } = await getFetch<T>("user-project")
    return data
}
