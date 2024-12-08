import { Field } from "@prisma/client"
import { getFetch } from "@/lib/utils"

/**
 * Fetches all Field from the database.
 * The data is cached, and can be updated using the `revalidateTags` with the `Fields` tag.
 *
 * @returns - A list of zones from the database
 */
export const getFields = async <T extends unknown[] = Field[]>(): Promise<T> => {
    const { data } = await getFetch<T>(`fields`)
    return data
}

export const getFieldById = async (FieldId: string) => {
    const { data } = await getFetch<Field>(`fields/${FieldId}`)
    return data
}
