import { Zones } from "@prisma/client"
import { getFetch } from "@/lib/utils"

/**
 * TODO: Adds caching to the fetch request when the module to adds zones is implemented.
 *
 * Fetches the zones associated with a specific user from the database.
 * The data is cached, and can be updated using the `revalidateTags` with the `zonesByUser` tag.
 *
 * @param userId - The user id to get the zones related to them from the database
 * @returns - A list of zones related to the user
 */
export const getZonesByUser = async (userId: number): Promise<Zones[]> => {
    const { data } = await getFetch<Zones[]>(`users/${userId}/zones`)
    return data
}

/**
 * TODO: Adds caching to the fetch request when the module to adds zones is implemented.
 *
 * Fetches all zones from the database.
 * The data is cached, and can be updated using the `revalidateTags` with the `zones` tag.
 *
 * @returns - A list of zones from the database
 */
export const getZones = async (): Promise<Zones[]> => {
    const { data } = await getFetch<Zones[]>(`zones`)
    return data
}
