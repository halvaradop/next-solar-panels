"use server"
import { PositionResistivity } from "@/lib/@types/models"
import { getFetch } from "@/lib/utils"

/**
 * Gets all Position Resistivities from the database
 *
 * @returns {Promise<PositionResistivity[]>} A promise that resolves to the retrieved data.
 */
export const getPositionResistivities = async (): Promise<PositionResistivity[]> => {
    "use cache"
    const { data } = await getFetch<PositionResistivity[]>("position-resistivities")
    return data
}
