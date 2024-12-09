import { ContactPerson, Field, Project, StakeHolder } from "@prisma/client"
import { getFetch } from "@/lib/utils"

/**
 * Fetches all stake Holders from the database
 *
 * @returns {Promise<StakeHolder[]>} - A promise that resolves to a list of  stake Holders
 */
export const getStakeHolder = async <T extends unknown[] = StakeHolder[]>(): Promise<T> => {
    const { data } = await getFetch<T>("stake-holders")
    return data
}

/**
 * Fetches all plants from the database by the  stake Holder
 *
 * @param {string} stakeHolderId - The ID of the  stake Holder to fetch plants for
 * @returns {Promise<Project[]>} - A promise that resolves to a list of plants
 */
export const getProjectsByStakeHolderId = async <T extends unknown[] = Project[]>(stakeHolderId: string): Promise<T> => {
    const { data } = await getFetch<T>(`stake-holders/${stakeHolderId}/projects`)
    return data
}

/**
 * Fetches all zones from the database by the  stake Holder
 *
 * @param {string} stakeHolderId - The ID of the  stake Holder to fetch zones for
 * @returns {Promise<Field[]>} - A promise that resolves to a list of zones
 */
export const getFieldsByStakeHolderId = async <T extends unknown[] = Field[]>(stakeHolderId: string): Promise<T> => {
    const { data } = await getFetch<T>(`stake-holders/${stakeHolderId}/fields`)
    return data
}

/**
 * Fetches all users associated with a specific  stake Holder from the database
 *
 * @param {string} stakeHolderId - The ID of the  stake Holder to fetch users for
 * @returns {Promise<User[]>} - A promise that resolves to a list of users
 */
export const getContactPersonByStakeHolderId = async <T extends unknown[] = ContactPerson[]>(
    stakeholderId: string
): Promise<T> => {
    const { data } = await getFetch<T>(`stake-holders/${stakeholderId}/contact-people`)
    return data
}
