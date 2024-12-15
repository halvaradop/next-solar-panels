import { PositionResistivity } from "@prisma/client"
import { getFetch } from "@/lib/utils"

/**
 * Fetches position resistivities data from the "position-resistivities" endpoint.
 *
 * @returns {Promise<T>} A promise that resolves to the fetched data.
 */
export const getPositionResistivities = async <T extends unknown[] = PositionResistivity[]>(): Promise<T> => {
    const { data } = await getFetch<T>("position-resistivities")
    return data
}
