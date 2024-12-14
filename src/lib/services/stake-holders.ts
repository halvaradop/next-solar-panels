import { ContactPerson, Field, PositionData, Project, StakeHolder } from "@prisma/client"
import { getFetch } from "@/lib/utils"

/**
 * Fetches all stake Holders from the database
 *
 * @returns {Promise<StakeHolder[]>} - A promise that resolves to a list of  stake Holders
 */
export const getStakeholder = async <T extends unknown[] = StakeHolder[]>(): Promise<T> => {
    const { data } = await getFetch<T>("stake-holders")
    return data || []
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
    stakeHolderId: string
): Promise<T> => {
    const { data } = await getFetch<T>(`stake-holders/${stakeHolderId}/contact-people`)
    return data
}

/**
 * Fetches all plants from the database by the  stake Holder and field
 *
 * @param {string} stakeHolderId - The ID of the  stake Holder to fetch plants for
 * @returns {Promise<Project[]>} - A promise that resolves to a list of plants
 */
export const getProjectsByStakeHolderIdAndFieldId = async <T extends unknown[] = Project[]>(
    stakeHolderId: string
): Promise<T> => {
    const { data } = await getFetch<T>(`stake-holders/${stakeHolderId}/projects`)
    return data
}

/**
 * Fetches all PositionData from the database.
 *
 * @param {string} stakeholderId - The id of the stakeholder
 * @returns {Promise<T>} - A list of zones from the database
 */
export const getPositionDataByStakeholderId = async <T extends unknown[] = PositionData[]>(stakeholderId: string): Promise<T> => {
    const { data } = await getFetch<T>(`stake-holders/${stakeholderId}/position-datas`)
    return data
}

/**
 * Fetches the user plants related to the given user id.
 *
 * @param {string} stakeHolderId - The user id.
 * @returns {Promise<ProjectsOnUsers[]>} - A promise that resolves to an array of ProjectsOnUsers.
 */
export const getContacPersonProjectsByStakeHolder = async <T extends unknown[] = (ContactPerson & Project)[]>(
    stakeHolderId: string
): Promise<T> => {
    const { data } = await getFetch<T>(`stake-holders/${stakeHolderId}`)
    return data
}

/**
 * Fetches all PositionSoilDatas from the database.
 *
 * @param {string} stakeholderId - The id of the stakeholder
 * @returns {Promise<T>} - A list of zones from the database
 */
export const getPositionSoilDatasByStakeholderId = async <T extends unknown[] = PositionData[]>(
    stakeholderId: string
): Promise<T> => {
    const { data } = await getFetch<T>(`stake-holders/${stakeholderId}/position-soil-datas`)
    return data
}

/**
 * Fetches all PositionMeasurements from the database.
 *
 * @param {string} stakeholderId - The id of the stakeholder
 * @returns {Promise<T>} - A list of zones from the database
 */
export const getPositionMeasurementsByStakeholderId = async <T extends unknown[] = PositionData[]>(
    stakeholderId: string
): Promise<T> => {
    const { data } = await getFetch<T>(`stake-holders/${stakeholderId}/position-measurements`)
    return data
}

/**
 * Fetches all PositionResistivities from the database.
 *
 * @param {string} stakeholderId - The id of the stakeholder
 * @returns {Promise<T>} - A list of zones from the database
 */
export const getPositionResistivitiesByStakeholderId = async <T extends unknown[] = PositionData[]>(
    stakeholderId: string
): Promise<T> => {
    const { data } = await getFetch<T>(`stake-holders/${stakeholderId}/position-resistivities`)
    return data
}
