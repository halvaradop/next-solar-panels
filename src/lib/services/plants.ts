import { Plants, Zones } from "@prisma/client"
import { ResponseAPI } from "@/lib/@types/types"

/**
 *
 * @param userId
 * @returns
 */
export const getPlantsByUser = async (userId: number): Promise<Plants[]> => {
    const response = await fetch(`http://localhost:3000/api/v1/employees/${userId}/plants`)
    const json: ResponseAPI<Plants[]> = await response.json()
    return json.data
}

/**
 *
 * @param userId
 * @returns
 */
export const getZonesPlantsByUser = async (userId: number): Promise<Zones[]> => {
    const response = await fetch(`http://localhost:3000/api/v1/employees/${userId}/zonesByCompany`)
    const json: ResponseAPI<Zones[]> = await response.json()
    return json.data
}

export const getPlantByCompany = async (userId: number): Promise<Plants[]> => {
    const response = await fetch(`http://localhost:3000/api/v1/employees/${userId}/plants`)
    const json: ResponseAPI<Plants[]> = await response.json()
    return json.data
}
