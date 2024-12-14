import { PositionSoilData } from "@prisma/client"
import { getFetch } from "@/lib/utils"
import { PositionSoildDataById } from "@/lib/@types/types"

/**
 * Fetches a PositionSoilData by its id from the database.
 *
 * @param sampleId - The id of the sample to fetch
 * @returns {Promise<PositionSoilData>} - A sample by its id
 */
export const getPositionSoilDataById = async <T extends object = PositionSoildDataById>(
    positionSoilDataId: string
): Promise<T> => {
    const { data } = await getFetch<T>(`position-soil-datas/${positionSoilDataId}`)
    return data
}

/**
 * Fetches position soil data from the "position-soil-datas" endpoint.
 *
 * @returns {Promise<T>} A promise that resolves to the fetched data.
 */
export const getPositionSoilDatas = async <T extends unknown[] = PositionSoilData[]>(): Promise<T> => {
    const { data } = await getFetch<T>(`position-soil-datas`)
    return data
}
