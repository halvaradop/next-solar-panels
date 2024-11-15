import { Zones } from "@prisma/client"
import { getFetch } from "@/lib/utils"

/**
 * TODO: Adds caching to the fetch request when the module to adds zones is implemented.
 *
 * Fetches all zones from the database.
 * The data is cached, and can be updated using the `revalidateTags` with the `zones` tag.
 *
 * @returns - A list of zones from the database
 */
export const getZones = async <T extends unknown[] = Zones[]>(): Promise<T> => {
    const { data } = await getFetch<T>(`zones`)
    return data
}
