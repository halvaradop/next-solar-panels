import { Zones } from "@prisma/client"
import { ResponseAPI, SampleZone } from "@/lib/@types/types"

/**
 * Fetches the sample data associated with a specific user from the database.
 * The data is cached, and can be updated using the `revalidateTags` with the `samplesByUser` tag.
 *
 * @param userId - The user id to get the samples related to them from the database
 * @returns - A list of samples related to the user
 */
export const getSamplesByUser = async (userId: number): Promise<SampleZone[]> => {
    const response = await fetch(`http://localhost:3000/api/v1/employees/${userId}/samples`)
    const json: ResponseAPI<SampleZone[]> = await response.json()
    return json.data
}

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
    const response = await fetch(`http://localhost:3000/api/v1/employees/${userId}/zones`)
    const json: ResponseAPI<Zones[]> = await response.json()
    return json.data
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
    const response = await fetch("http://localhost:3000/api/v1/zones")
    const json: ResponseAPI<Zones[]> = await response.json()
    return json.data
}
