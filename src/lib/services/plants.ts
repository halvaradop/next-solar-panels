import { Plants, Zones } from "@prisma/client"
import { getFetch } from "@/lib/utils"

/**
 * Fetches all plants from the database by user
 *
 * @param userId - The userId to fetch plants
 * @returns {Promise<Plants[]>} - A list of plants
 */
export const getPlantsByUser = async (userId: number): Promise<Plants[]> => {
    const { data } = await getFetch<Plants[]>(`employees/${userId}/plants`)
    return data
}

/**
 * Fetches all zones from the database by the company associated with the user
 *
 * @param userId - the userId to fetch zones
 * @returns {Promise<Zones[]>} - A list of zones
 */
export const getZonesPlantsByUser = async (userId: number): Promise<Zones[]> => {
    const { data } = await getFetch<Zones[]>(`employees/${userId}/zonesByCompany`)
    return data
}

/**
 * Fetches all plants from the database by company
 *
 * @param userId - The userId to fetch plants
 * @returns {Promise<Plants[]>} - A list of plants
 */
export const getPlantByCompany = async (userId: number): Promise<Plants[]> => {
    const { data } = await getFetch<Plants[]>(`employees/${userId}/plants`)
    return data
}
