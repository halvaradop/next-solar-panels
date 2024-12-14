import { PositionData } from "@prisma/client"
import { getFetch } from "@/lib/utils"

/**
 * Fetches all position datas of the database endpoint.
 *
 * @returns {Promise<T>} A promise that resolves to the fetched data.
 */
export const getPositionDatas = async <T extends unknown[] = PositionData[]>(): Promise<T> => {
    const { data } = await getFetch<T>("position-datas")
    return data
}
