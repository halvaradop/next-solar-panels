import { Roles } from "@prisma/client"
import { getFetch } from "@/lib/utils"

/**
 * Fetches all roles from the database
 *
 * @returns {Promise<Roles[]>} - A list of roles
 */
export const getRoles = async (): Promise<Roles[]> => {
    const { data } = await getFetch<Roles[]>("roles")
    return data
}
