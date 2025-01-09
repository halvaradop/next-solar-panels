"use server"
import { PositionData } from "@/lib/@types/models"

/**
 * Gets all PositionDatas from the database
 *
 * @returns {Promise<PositionData[]>} A promise that resolves to the retrieved data.
 */
export const getPositionDatas = async (): Promise<PositionData[]> => {
    "use cache"
    // @ts-expect-error
    return await prisma.positionData.findMany()
}
