"use server"
import { PositionSoilData } from "@prisma/client"
import { prisma } from "@/lib/prisma"
import { GetPositionSoilDataById } from "@/lib/@types/types"

/**
 * Gets a specific Position Soil Data from the database
 *
 * @param {string} idPositionSoilData - The id of the Position Soil Data to fetch
 */
export const getPositionSoilDataById: GetPositionSoilDataById = async (idPositionSoilData: string) => {
    "use cache"
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
    return await prisma.positionSoilData.findMany()
}
