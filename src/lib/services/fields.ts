import { Field, PositionData } from "@prisma/client"
import { getFetch } from "@/lib/utils"

/**
 * Fetches all Field from the database.
 * The data is cached, and can be updated using the `revalidateTags` with the `Fields` tag.
 *
 * @returns {Promise<T>} - A list of zones from the database
 */
export const getFields = async <T extends unknown[] = Field[]>(): Promise<T> => {
    const { data } = await getFetch<T>("fields")
    return data
}

/**
 * Fetches a single Field from the database.
 *
 * @param {string} fieldId - The id of the Field to fetch
 * @returns {Promise<Field>} - The Field from the database
 */
export const getFieldById = async (fieldId: string): Promise<Field> => {
    const { data } = await getFetch<Field>(`fields/${fieldId}`)
    return data
}

export const getPositionDatasFieldById = async <T extends unknown[] = PositionData[]>(fieldId: string): Promise<T> => {
    const { data } = await getFetch<T>(`fields/${fieldId}/position-datas`)
    return data
}
