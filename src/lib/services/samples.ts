import { Samples } from "@prisma/client"
import { getFetch } from "@/lib/utils"

/**
 * Fetches a sample by its id from the database.
 *
 * @param sampleId - The id of the sample to fetch
 * @returns {Promise<Samples>} - A sample by its id
 */
export const getSamplesByUserId = async (sampleId: number): Promise<Samples> => {
    const { data } = await getFetch<Samples>(`samples/${sampleId}`)
    return data
}
