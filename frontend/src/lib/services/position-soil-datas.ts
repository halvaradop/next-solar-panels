"use server"
import { PositionSoilData } from "@/lib/@types/models"
import { GetPositionSoilDataById } from "@/lib/@types/types"
import { getFetch } from "@/lib/utils"

/**
 * Gets a specific Position Soil Data from the database
 *
 * @param {string} idPositionSoilData - The id of the Position Soil Data to fetch
 */
export const getPositionSoilDataById: GetPositionSoilDataById = async (idPositionSoilData: string) => {
    "use cache"
    // @ts-expect-error
    return await prisma.positionSoilData.findUnique({
        where: {
            idPositionSoilData,
        },
        include: {
            contactPerson: {
                select: {
                    firstName: true,
                    lastName: true,
                },
            },
        },
    })
}

/**
 * Gets all Position Soil Datas from the database
 *
 * @returns {Promise<T>} A promise that resolves to the fetched data.
 */
export const getPositionSoilDatas = async (): Promise<PositionSoilData[]> => {
    "use cache"
    const { data } = await getFetch<PositionSoilData[]>("position-soil-datas")
    return data
}
