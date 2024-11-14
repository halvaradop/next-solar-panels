import { Zones, Samples, Companies, Roles, Users, Plants } from "@prisma/client"
import { ResponseAPI } from "@/lib/@types/types"

/**
 * Fetches the sample data associated with a specific user from the database.
 * The data is cached, and can be updated using the `revalidateTags` with the `samplesByUser` tag.
 *
 * @param userId - The user id to get the samples related to them from the database
 * @returns - A list of samples related to the user
 */
export const getSamplesByUser = async (userId: number): Promise<Samples[]> => {
    const response = await fetch(`http://localhost:3000/api/v1/employees/${userId}/samples`)
    const json: ResponseAPI<Samples[]> = await response.json()
    return json.data
}

/**
 * TODO: Adds caching to the fetch request when the module to adds zones is implemented.
 *
 * Fetches the zones associated with a specific user from the database.
 * The data is cached, and can be updated using the `revalidateTags` with the `zonesByUser` tag.
 *
 * @param userId - The user id to get the zones related to them from the database
 * @returns - A list of zones related to the user
 */
export const getZonesByUser = async (userId: number): Promise<Zones[]> => {
    const response = await fetch(`http://localhost:3000/api/v1/employees/${userId}/zones`)
    const json: ResponseAPI<Zones[]> = await response.json()
    return json.data
}

/**
 * TODO: Adds caching to the fetch request when the module to adds zones is implemented.
 *
 * Fetches all zones from the database.
 * The data is cached, and can be updated using the `revalidateTags` with the `zones` tag.
 *
 * @returns - A list of zones from the database
 */
export const getZones = async (): Promise<Zones[]> => {
    const response = await fetch("http://localhost:3000/api/v1/zones")
    const json: ResponseAPI<Zones[]> = await response.json()
    return json.data
}

/**
 * Fetches a sample by its id from the database.
 *
 * @returns - A sample by its id
 */
export const getSamplesById = async (sampleId: number): Promise<Samples> => {
    const response = await fetch(`http://localhost:3000/api/v1/samples/${sampleId}`)
    const json: ResponseAPI<Samples> = await response.json()
    return json.data
}

export const getCompanies = async (): Promise<Companies[]> => {
    const response = await fetch("http://localhost:3000/api/v1/companies")
    const json: ResponseAPI<Companies[]> = await response.json()
    return json.data
}

export const getRoles = async (): Promise<Roles[]> => {
    const response = await fetch("http://localhost:3000/api/v1/roles")
    const json: ResponseAPI<Roles[]> = await response.json()
    return json.data
}

export const getUserByCompany = async (userId: number): Promise<Users[]> => {
    const response = await fetch(`http://localhost:3000/api/v1/employees/${userId}/users`)
    const json: ResponseAPI<Users[]> = await response.json()
    return json.data
}

export const getUsers = async (): Promise<Users[]> => {
    const response = await fetch("http://localhost:3000/api/v1/users")
    const json: ResponseAPI<Users[]> = await response.json()
    return json.data
}


export const getPlantByCompany = async (userId: number): Promise<Plants[]> => {
    const response = await fetch(`http://localhost:3000/api/v1/employees/${userId}/plants`)
    const json: ResponseAPI<Plants[]> = await response.json()
    return json.data
}
