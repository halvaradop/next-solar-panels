import { Linkage } from "@prisma/client"
import { getFetch } from "../utils"

/**
 * Fetches all users and projects from the database
 * @returns {Promise<T[]>} - A list of projects related to the user
 */
export const getContactPersonOnProjects = async <T extends unknown[] = Linkage[]>(): Promise<T> => {
    const { data } = await getFetch<T>("linkage")
    return data
}
