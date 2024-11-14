import { Samples } from "@prisma/client"
import { getFetch } from "@/lib/utils"

/**
 * Fetches the sample data associated with a specific user from the database.
 *
 * @param userId - The user id to get the samples related to them from the database
 * @returns {Promise<Samples[]>} - A list of samples related to the user
 */
export const getSamplesByUser = async (userId: number): Promise<Samples[]> => {
    const { data } = await getFetch<Samples[]>(`users/${userId}/samples`)
    return data
}

/**
 * Fetches a sample by its id from the database.
 *
 * @returns {Promise<Samples>} - A sample by its id
 */
export const getSamplesById = async (sampleId: number): Promise<Samples> => {
    const { data } = await getFetch<Samples>(`samples/${sampleId}`)
    return data
}
