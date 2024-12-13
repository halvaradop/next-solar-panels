import { PositionSoilData } from "@prisma/client"
import { getFetch } from "@/lib/utils"

/**
 * Fetches a PositionSoilData by its id from the database.
 *
 * @param sampleId - The id of the sample to fetch
 * @returns {Promise<PositionSoilData>} - A sample by its id
 */
export const getPositionSoilDataById = async <
    T extends object = PositionSoilData & { field: { designation: string; latitude: string; longitude: string } } & {
        user: { firstName: string; lastName: string }
    },
>(
    positionSoilDataId: string
): Promise<T> => {
    const { data } = await getFetch<T>(`position-soil-datas/${positionSoilDataId}`)
    return data
}

export const getPositionSoilDatas = async <T extends object = PositionSoilData[]>() => {
    const { data } = await getFetch<T>(`position-soil-datas`)
    return data
}
