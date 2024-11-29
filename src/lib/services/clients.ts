import { Client, Project, User, Zone } from "@prisma/client"
import { getFetch } from "@/lib/utils"

/**
 * Fetches all clients from the database
 *
 * @returns {Promise<Client[]>} - A promise that resolves to a list of clients
 */
export const getClients = async <T extends unknown[] = Client[]>(): Promise<T> => {
    const { data } = await getFetch<T>("clients")
    return data
}

/**
 * Fetches all plants from the database by the client
 *
 * @param {string} clientId - The ID of the client to fetch plants for
 * @returns {Promise<Project[]>} - A promise that resolves to a list of plants
 */
export const getProjectsByClientId = async <T extends unknown[] = Project[]>(clientId: string): Promise<T> => {
    const { data } = await getFetch<T>(`clients/${clientId}/projects`)
    return data
}

/**
 * Fetches all zones from the database by the client
 *
 * @param {string} clientId - The ID of the client to fetch zones for
 * @returns {Promise<Zones[]>} - A promise that resolves to a list of zones
 */
export const getZonesByClientId = async <T extends unknown[] = Zone[]>(clientId: string): Promise<T> => {
    const { data } = await getFetch<T>(`clients/${clientId}/zones`)
    return data
}

/**
 * Fetches all users associated with a specific client from the database
 *
 * @param {string} clientId - The ID of the client to fetch users for
 * @returns {Promise<User[]>} - A promise that resolves to a list of users
 */
export const getUsersByClientId = async <T extends unknown[] = User[]>(clientId: string): Promise<T> => {
    const { data } = await getFetch<T>(`clients/${clientId}/users`)
    return data
}
