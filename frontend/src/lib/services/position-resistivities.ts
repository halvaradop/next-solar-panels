"use server"
import { prisma } from "@/lib/prisma"
import { PositionResistivity } from "@prisma/client"

/**
 * Gets all Position Resistivities from the database
 *
 * @returns {Promise<PositionResistivity[]>} A promise that resolves to the retrieved data.
 */
export const getPositionResistivities = async (): Promise<PositionResistivity[]> => {
    "use cache"
    return await prisma.positionResistivity.findMany()
}
