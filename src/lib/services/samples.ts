import { Samples } from "@prisma/client"
import { getFetch } from "@/lib/utils"

/**
 * Fetches a sample by its id from the database.
 *
 * @param sampleId - The id of the sample to fetch
 * @returns {Promise<Samples>} - A sample by its id
 */
export const getSamplesById = async <T extends object = Samples>(sampleId: number): Promise<T> => {
    const { data } = await getFetch<T>(`samples/${sampleId}`)
    return data
}
