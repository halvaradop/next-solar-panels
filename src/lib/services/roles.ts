import { Roles } from "@prisma/client"
import { getFetch } from "@/lib/utils"

/**
 * Fetches all roles from the database
 *
 * @returns {Promise<Roles[]>} - A list of roles
 */
export const getRoles = async <T extends unknown[] = Roles[]>(): Promise<T> => {
    const { data } = await getFetch<T>("roles")
    return data
}
