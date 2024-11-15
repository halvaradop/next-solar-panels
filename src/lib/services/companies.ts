import { Companies, Plants, Users, Zones } from "@prisma/client"
import { getFetch } from "@/lib/utils"

/**
 * Fetches all companies from the database
 *
 * @returns {Promise<Companies[]>} - A list of companies
 */
export const getCompanies = async (): Promise<Companies[]> => {
    const { data } = await getFetch<Companies[]>("companies")
    return data
}

/**
 * Fetches all plants from the database by the company
 *
 * @param userId - The companyId to fetch plants
 * @returns {Promise<Plants[]>} - A list of plants
 */
export const getPlantsByCompanyId = async (companyId: number): Promise<Plants[]> => {
    const { data } = await getFetch<Plants[]>(`companies/${companyId}/plants`)
    return data
}

/**
 * Fetches all zones from the database by the company
 *
 * @param userId - the userId to fetch zones
 * @returns {Promise<Zones[]>} - A list of zones
 */
export const getZonesByCompanyId = async (companyId: number): Promise<Zones[]> => {
    const { data } = await getFetch<Zones[]>(`companies/${companyId}/zones`)
    return data
}

/**
 * TODO: migrate the `getUserByCompany` function to the `company` module.
 *
 * Fetches all users associated with a specific company from the database
 * @param {number} companyId - The ID of the user whose company users are to be fetched
 * @returns {Promise<Users[]>} - A promise that resolves to a list of users
 */
export const getUsersByCompanyId = async (companyId: number): Promise<Users[]> => {
    const { data } = await getFetch<Users[]>(`companies/${companyId}/users`)
    return data
}
