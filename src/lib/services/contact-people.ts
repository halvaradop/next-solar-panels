import { ContactPerson, PositionMeasurement, PositionResistivity, PositionSoilData, Project } from "@prisma/client"
import { getFetch } from "@/lib/utils"
import { ContactPersonAPI } from "@/lib/@types/types"

/**
 * Fetches all users from the database
 *
 * @returns {Promise<T[]>} - A list of users
 */
export const getContactaPeople = async <T extends unknown[] = ContactPerson[]>(): Promise<T> => {
    const { data } = await getFetch<T>("contact-people")
    return data
}

/**
 * Fetches a specific user from the database by their id.
 *
 * @param {string} contactaPersonId - The user id to get the user from the database
 * @returns {Promise<T>} - A user object
 */
export const getContactPersonById = async <T extends object = ContactPersonAPI>(contactaPersonId: string): Promise<T> => {
    const { data } = await getFetch<T>(`contact-people/${contactaPersonId}`)
    return data
}

/**
 * Fetches the PositionSoilData data associated with a specific user from the database.
 *
 * @param {string} contactPersonId - The user id to get the PositionSoilData related to them from the database
 * @returns {Promise<T[]>} - A list of PositionSoilData related to the user
 */
export const getPositionSoilDataByContactPerson = async <T extends unknown[] = PositionSoilData[]>(
    contactPersonId: string
): Promise<T> => {
    const { data } = await getFetch<T>(`contact-people/${contactPersonId}/position-soil-datas`)
    return data
}

/**
 * Fetches position measurements for a given contact person.
 *
 * @template T - The type of the position measurements, defaults to an array of PositionMeasurement objects.
 * @param {string} idContactPerson - The ID of the contact person whose position measurements are to be fetched.
 * @returns {Promise<T>} A promise that resolves to the position measurements data.
 */
export const getPositionMeasurementsByContactPerson = async <T extends unknown[] = PositionMeasurement[]>(
    idContactPerson: string
): Promise<T> => {
    const { data } = await getFetch<T>(`contact-people/${idContactPerson}/position-measurements`)
    return data
}

/**
 * Fetches all PositionResistivity from the database.
 *
 * @param {string} idContactPerson - The contact person id to filter the position resistivities.
 * @returns {Promise<T>[]} - A list of zones from the database
 */
export const getPositionResistiviesByContactPerson = async <T extends unknown[] = PositionResistivity[]>(
    idContactPerson: string
): Promise<T> => {
    const { data } = await getFetch<T>(`contact-people/${idContactPerson}/position-resistivities`)
    return data
}

/**
 * Fetches all projects associated with a specific user from the database.
 *
 * @param {string} contactPersonId - The user id to get the projects related to them from the database
 * @returns {Promise<T[]>} - A list of projects related to the user
 */
export const getProjectsByContactPersonId = async <T extends unknown[] = Project[]>(contactPersonId: string): Promise<T> => {
    const { data } = await getFetch<T>(`contact-people/${contactPersonId}/projects`)
    return data
}
