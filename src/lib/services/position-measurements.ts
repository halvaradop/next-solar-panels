"use server"
import { prisma } from "@/lib/prisma"
import { PositionMeasurement } from "@prisma/client"

/**
 * Gets all Position Measurements from the database
 *
 * @returns {Promise<PositionMeasurement[]>} A promise that resolves to the retrieved data.
 */
export const getPositionMeasurements = async (): Promise<PositionMeasurement[]> => {
    "use cache"
    return await prisma.positionMeasurement.findMany()
}
