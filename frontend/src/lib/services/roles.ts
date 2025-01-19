"use server"
import { Role } from "@/lib/@types/models"
import { getFetch } from "@/lib/utils"

/**
 * Gets all Roles from the database
 *
 * @returns {Promise<Role[]>} A promise that resolves to the retrieved data.
 */
export const getRoles = async (): Promise<Role[]> => {
    "use cache"
    const { data } = await getFetch<Role[]>("roles")
    return data
}
