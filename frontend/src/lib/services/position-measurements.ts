"use server"
import { PositionMeasurement } from "@/lib/@types/models"
import { getFetch } from "@/lib/utils"

/**
 * Gets all Position Measurements from the database
 *
 * @returns {Promise<PositionMeasurement[]>} A promise that resolves to the retrieved data.
 */
export const getPositionMeasurements = async (): Promise<PositionMeasurement[]> => {
    "use cache"
    const { data } = await getFetch<PositionMeasurement[]>("position-measurements")
    return data
}
