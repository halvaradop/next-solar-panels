"use server"
import { PositionResistivity } from "@/lib/@types/models"

/**
 * Gets all Position Resistivities from the database
 *
 * @returns {Promise<PositionResistivity[]>} A promise that resolves to the retrieved data.
 */
export const getPositionResistivities = async (): Promise<PositionResistivity[]> => {
    "use cache"
    // @ts-expect-error
    return await prisma.positionResistivity.findMany()
}
