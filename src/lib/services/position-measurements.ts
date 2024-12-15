import { PositionMeasurement } from "@prisma/client"
import { getFetch } from "@/lib/utils"

/**
 * Fetches position measurements data from the "position-measurements" endpoint.
 *
 * @returns {Promise<T>} A promise that resolves to the fetched data.
 */
export const getPositionMeasurements = async <T extends unknown[] = PositionMeasurement[]>(): Promise<T> => {
    const { data } = await getFetch<T>("position-measurements")
    return data
}
