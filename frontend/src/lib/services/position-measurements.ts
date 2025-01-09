"use server"
import { PositionMeasurement } from "@/lib/@types/models"

/**
 * Gets all Position Measurements from the database
 *
 * @returns {Promise<PositionMeasurement[]>} A promise that resolves to the retrieved data.
 */
export const getPositionMeasurements = async (): Promise<PositionMeasurement[]> => {
    "use cache"
    // @ts-expect-error
    return await prisma.positionMeasurement.findMany()
}
