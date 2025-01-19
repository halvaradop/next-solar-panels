"use server"
import { Field, PositionData } from "@/lib/@types/models"
import { getFetch } from "@/lib/utils"

/**
 * Gets all Fields from the database.
 *
 * @returns {Promise<Field[]>} - A list of zones from the database
 */
export const getFields = async (): Promise<Field[]> => {
    "use cache"
    const { data } = await getFetch<Field[]>("fields")
    return data
}

/**
 * Gets all PositionDatas from the database which are related to a specific `idField`.
 *
 * @param {string} idField - The id of the Field to fetch
 * @returns {Promise<Field>} - The Field from the database
 */
export const getPositionDatasFieldById = async (idField: string): Promise<PositionData[]> => {
    "use cache"
    const { data } = await getFetch<PositionData[]>(`fields/${idField}`)
    return data
}
