"use server"
import { Field, PositionData } from "@prisma/client"
import { prisma } from "@/lib/prisma"

/**
 * Gets all Fields from the database.
 *
 * @returns {Promise<Field[]>} - A list of zones from the database
 */
export const getFields = async (): Promise<Field[]> => {
    "use cache"
    return await prisma.field.findMany()
}

/**
 * Gets all PositionDatas from the database which are related to a specific `idField`.
 *
 * @param {string} idField - The id of the Field to fetch
 * @returns {Promise<Field>} - The Field from the database
 */
export const getPositionDatasFieldById = async (idField: string): Promise<PositionData[]> => {
    "use cache"
    return await prisma.positionData.findMany({
        where: {
            idField,
        },
        include: {
            field: true,
        },
    })
}
