import { Role } from "@prisma/client"
import { getFetch } from "@/lib/utils"

/**
 * Fetches all roles from the database
 *
 * @returns {Promise<Role[]>} - A list of roles
 */
export const getRoles = async <T extends unknown[] = Role[]>(): Promise<T> => {
    const { data } = await getFetch<T>("roles")
    return data
}
