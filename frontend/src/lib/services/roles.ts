"use server"
import { Role } from "@prisma/client"
import { prisma } from "@/lib/prisma"

/**
 * Gets all Roles from the database
 *
 * @returns {Promise<Role[]>} A promise that resolves to the retrieved data.
 */
export const getRoles = async (): Promise<Role[]> => {
    return await prisma.role.findMany()
}
