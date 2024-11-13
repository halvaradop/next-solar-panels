import { Samples } from "@prisma/client"
import { ResponseAPI } from "@/lib/@types/types"

/**
 * Fetches the sample data associated with a specific user from the database.
 * The data is cached, and can be updated using the `revalidateTags` with the `samplesByUser` tag.
 *
 * @param userId - The user id to get the samples related to them from the database
 * @returns - A list of samples related to the user
 */
export const getSamplesByUser = async (userId: number): Promise<Samples[]> => {
    const response = await fetch(`http://localhost:3000/api/v1/employees/${userId}/samples`)
    const json: ResponseAPI<Samples[]> = await response.json()
    return json.data
}

/**
 * Fetches a sample by its id from the database.
 *
 * @returns - A sample by its id
 */
export const getSamplesById = async (sampleId: number): Promise<Samples> => {
    const response = await fetch(`http://localhost:3000/api/v1/samples/${sampleId}`)
    const json: ResponseAPI<Samples> = await response.json()
    return json.data
}
