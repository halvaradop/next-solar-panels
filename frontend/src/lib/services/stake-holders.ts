"use server"
import { PositionData, PositionMeasurement, PositionResistivity, PositionSoilData, StakeHolder } from "@/lib/@types/models"
import { GetContactPeopleByStakeHolderId, GetFieldsByStakeHolderId, GetProjectsByStakeHolderId } from "@/lib/@types/types"

export const getStakeholder = async (): Promise<StakeHolder[]> => {
    "use cache"
    // @ts-expect-error
    return await prisma.stakeHolder.findMany({
        include: {
            contactPerson: true,
        },
    })
}

/**
 * Gets all Projects from the database by the  stake Holder
 *
 * @param {string} idStakeholder - The ID of the  stake Holder to retrieve projects
 */
export const getProjectsByStakeHolderId: GetProjectsByStakeHolderId = async (idStakeholder: string) => {
    "use cache"
    // @ts-expect-error
    return await prisma.project.findMany({
        where: {
            idStakeholder,
        },
        include: {
            address: true,
            contactPerson: true,
            stakeholder: true,
        },
    })
}

/**
 * Gets all zones from the database by the  stake Holder
 *
 * @param {string} idStakeholder - The ID of the  stake Holder to fetch zones for
 */
export const getFieldsByStakeHolderId: GetFieldsByStakeHolderId = async (idStakeholder: string) => {
    "use cache"
    // @ts-expect-error
    return await prisma.field.findMany({
        where: {
            project: {
                idStakeholder,
            },
        },
        include: {
            project: true,
            address: true,
        },
    })
}

/**
 * Gets all users associated with a specific  stake Holder from the database
 *
 * @param {string} idStakeHolder - The ID of the  stake Holder to fetch users for
 */
export const getContactPeopleByStakeHolderId: GetContactPeopleByStakeHolderId = async (idStakeHolder: string) => {
    "use cache"
    // @ts-expect-error
    return await prisma.contactPerson.findMany({
        where: {
            stakeHolder: {
                some: {
                    idStakeHolder,
                },
            },
        },
        include: {
            role: true,
        },
    })
}

/**
 * Gets all PositionData from the database.
 *
 * @param {string} idStakeholder - The id of the stakeholder
 * @returns {Promise<PositionData[]>} - A list of zones from the database
 */
export const getPositionDataByStakeholderId = async (idStakeholder: string): Promise<PositionData[]> => {
    "use cache"
    // @ts-expect-error
    return await prisma.positionData.findMany({
        where: {
            field: {
                project: {
                    idStakeholder,
                },
            },
        },
    })
}

/**
 * Gets all Position Soil Datas from the database.
 *
 * @param {string} idStakeHolder - The id of the stakeholder
 * @returns {Promise<PositionSoilData[]>} - A list of zones from the database
 */
export const getPositionSoilDatasByStakeholderId = async (idStakeHolder: string): Promise<PositionSoilData[]> => {
    "use cache"
    // @ts-expect-error
    return await prisma.positionSoilData.findMany({
        where: {
            contactPerson: {
                stakeHolder: {
                    some: {
                        idStakeHolder,
                    },
                },
            },
        },
    })
}

/**
 * Gets all Position Measurements from the database.
 *
 * @param {string} idStakeHolder - The id of the stakeholder
 * @returns {Promise<PositionMeasurement[]>} - A list of zones from the database
 */
export const getPositionMeasurementsByStakeholderId = async (idStakeHolder: string): Promise<PositionMeasurement[]> => {
    "use cache"
    // @ts-expect-error
    return await prisma.positionMeasurement.findMany({
        where: {
            contactPerson: {
                stakeHolder: {
                    some: {
                        idStakeHolder,
                    },
                },
            },
        },
    })
}

/**
 * Gets all Position Resistivities from the database.
 *
 * @param {string} idStakeHolder - The id of the stakeholder
 * @returns {Promise<PositionResistivity[]>} - A list of zones from the database
 */
export const getPositionResistivitiesByStakeholderId = async (idStakeHolder: string): Promise<PositionResistivity[]> => {
    "use cache"
    // @ts-expect-error
    return await prisma.positionResistivity.findMany({
        where: {
            contactPerson: {
                stakeHolder: {
                    some: {
                        idStakeHolder,
                    },
                },
            },
        },
    })
}
