import { ContactPerson, Linkage, PositionSoilData } from "@prisma/client"
import { getFetch } from "@/lib/utils"
import { UserSession } from "@/lib/@types/types"

/**
 * Fetches all users from the database
 *
 * @returns {Promise<ContactPerson[]>} - A list of users
 */
export const getContactaPeople = async <T extends unknown[] = ContactPerson[]>(): Promise<T> => {
    const { data } = await getFetch<T>("contact-people")
    return data
}

/**
 * Fetches a specific user from the database by their id.
 *
 * @param {string} userId - The user id to get the user from the database
 * @returns {Promise<UserSession>} - A user object
 */
export const getContactPersonById = async <T extends object = UserSession>(contactaPersonId: string): Promise<T> => {
    const { data } = await getFetch<T>(`contact-people/${contactaPersonId}`)
    return data
}

/**
 * Fetches the PositionSoilData data associated with a specific user from the database.
 *
 * @param {string} userId - The user id to get the PositionSoilData related to them from the database
 * @returns {Promise<PositionSoilData[]>} - A list of PositionSoilData related to the user
 */
export const getPositionSoilDataByContactPerson = async <T extends unknown[] = PositionSoilData[]>(
    contactPersonId: string
): Promise<T> => {
    const { data } = await getFetch<T>(`contact-people/${contactPersonId}/position-soil-datas`)
    return data
}

/**
 * Fetches all users and projects from the database
 *Todo fix
 * @returns {Promise<Linkage[]>} - A list of projects related to the user
 */
export const getContactPersonOnProjects = async <T extends unknown[] = Linkage[]>(): Promise<T> => {
    const { data } = await getFetch<T>("linkage")
    return data
}
