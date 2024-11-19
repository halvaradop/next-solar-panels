import { Sample } from "@prisma/client"
import { getFetch } from "@/lib/utils"

/**
 * Fetches a sample by its id from the database.
 *
 * @param sampleId - The id of the sample to fetch
 * @returns {Promise<Sample>} - A sample by its id
 */
export const getSampleById = async <T extends object = Sample>(sampleId: number): Promise<T> => {
    const { data } = await getFetch<T>(`samples/${sampleId}`)
    return data
}
