import { Client, Project, User, Zone } from "@prisma/client"
import { getFetch } from "@/lib/utils"

/**
 * Fetches all companies from the database
 *
 * @returns {Promise<Client[]>} - A promise that resolves to a list of companies
 */
export const getClients = async <T extends unknown[] = Client[]>(): Promise<T> => {
    const { data } = await getFetch<T>("companies")
    return data
}

/**
 * Fetches all plants from the database by the company
 *
 * @param {number} companyId - The ID of the company to fetch plants for
 * @returns {Promise<Project[]>} - A promise that resolves to a list of plants
 */
export const getProjectsByClientId = async <T extends unknown[] = Project[]>(companyId: number): Promise<T> => {
    const { data } = await getFetch<T>(`companies/${companyId}/plants`)
    return data
}

/**
 * Fetches all zones from the database by the company
 *
 * @param {number} companyId - The ID of the company to fetch zones for
 * @returns {Promise<Zones[]>} - A promise that resolves to a list of zones
 */
export const getZonesByClientId = async <T extends unknown[] = Zone[]>(companyId: number): Promise<T> => {
    const { data } = await getFetch<T>(`companies/${companyId}/zones`)
    return data
}

/**
 * Fetches all users associated with a specific company from the database
 *
 * @param {number} companyId - The ID of the company to fetch users for
 * @returns {Promise<User[]>} - A promise that resolves to a list of users
 */
export const getUsersByClientId = async <T extends unknown[] = User[]>(companyId: number): Promise<T> => {
    const { data } = await getFetch<T>(`companies/${companyId}/users`)
    return data
}
