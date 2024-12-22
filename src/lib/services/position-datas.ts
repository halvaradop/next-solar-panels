"use server"
import { prisma } from "@/lib/prisma"
import { PositionData } from "@prisma/client"

/**
 * Gets all PositionDatas from the database
 *
 * @returns {Promise<PositionData[]>} A promise that resolves to the retrieved data.
 */
export const getPositionDatas = async (): Promise<PositionData[]> => {
    "use cache"
    return await prisma.positionData.findMany()
}
