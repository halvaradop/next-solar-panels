"use server"
import { ContactPerson, PositionMeasurement, PositionResistivity, Project } from "@/lib/@types/models"
import { GetContactPersonById, GetPositionSoilDatasByContactPerson } from "@/lib/@types/types"
import { getFetch } from "@/lib/utils"

/**
 * Gets all contact people from the database.
 *
 * @returns {Promise<ContactPerson[]>} - A list of users
 */
export const getContactPeople = async (): Promise<ContactPerson[]> => {
    "use cache"
    const { data } = await getFetch<ContactPerson[]>("contactpeople")
    return data
}

/**
 * Gets a contact person from the database by their id.
 *
 * @param {string} idContactPerson - The user id to get the user from the database
 */
export const getContactPersonById: GetContactPersonById = async (idContactPerson: string) => {
    "use cache"
    // @ts-expect-error
    return await prisma.contactPerson.findUnique({
        where: {
            idContactPerson,
        },
        select: {
            email: true,
            firstName: true,
            lastName: true,
            fax: true,
            www: true,
            stakeHolder: true,
        },
    })
}

/**
 * Gets the PositionSoilData related to a specific user from the database.
 *
 * @param {string} idContactPerson - The user id to get the PositionSoilData related to them from the database
 */
export const getPositionSoilDatasByContactPerson: GetPositionSoilDatasByContactPerson = async (idContactPerson: string) => {
    "use cache"
    // @ts-expect-error
    return await prisma.positionSoilData.findMany({
        where: {
            idContactPerson,
        },
        include: {
            contactPerson: true,
        },
    })
}

/**
 * Gets the Position Measurements related to a specific user from the database.
 *
 * @param {string} idContactPerson - The user id to get the Position Measurements related to them from the database
 * @returns {Promise<PositionMeasurement[]>} - A list of Position Measurements related to the user
 */
export const getPositionMeasurementsByContactPerson = async (idContactPerson: string): Promise<PositionMeasurement[]> => {
    "use cache"
    // @ts-expect-error
    return await prisma.positionMeasurement.findMany({
        where: {
            idContactPerson,
        },
    })
}

/**
 * Gets the Position Resistivities related to a specific user from the database.
 *
 * @param {string} idContactPerson - The contact person id to filter the position resistivities.
 * @returns {Promise<PositionResistivity>[]} - A list of zones from the database
 */
export const getPositionResistivitiesByContactPerson = async (idContactPerson: string): Promise<PositionResistivity[]> => {
    "use cache"
    // @ts-expect-error
    return await prisma.positionResistivity.findMany({
        where: {
            idContactPerson,
        },
    })
}

/**
 * Gets all projects associated with a specific user from the database.
 *
 * @param {string} idContactPerson - The user id to get the projects related to them from the database
 * @returns {Promise<Project[]>} - A list of projects related to the user
 */
export const getProjectsByContactPersonId = async (idContactPerson: string): Promise<Project[]> => {
    "use cache"
    // @ts-expect-error
    return await prisma.project.findMany({
        where: {
            idContactPerson,
        },
    })
}

/**
 * Gets the contact people from the database associated with a specific idRole
 *
 * @param {number} idRole - identifier of the role to extract the contact people
 * @returns {Promise<Role[]>} A promise that resolves to the retrieved data.
 */
export const getContactPeopleById = async (idRole: number): Promise<ContactPerson[]> => {
    "use cache"
    // @ts-expect-error
    return await prisma.contactPerson.findMany({
        where: {
            idRole,
        },
    })
}
