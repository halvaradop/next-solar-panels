"use server"
import { Role } from "@/lib/@types/models"

/**
 * Gets all Roles from the database
 *
 * @returns {Promise<Role[]>} A promise that resolves to the retrieved data.
 */
export const getRoles = async (): Promise<Role[]> => {
    // @ts-expect-error
    return await prisma.role.findMany()
}
