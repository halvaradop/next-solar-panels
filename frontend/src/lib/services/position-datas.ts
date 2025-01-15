"use server"
import { PositionData } from "@/lib/@types/models"
import { getFetch } from "@/lib/utils"

/**
 * Gets all PositionDatas from the database
 *
 * @returns {Promise<PositionData[]>} A promise that resolves to the retrieved data.
 */
export const getPositionDatas = async (): Promise<PositionData[]> => {
    "use cache"
    const { data } = await getFetch<PositionData[]>("position-datas")
    return data
}
