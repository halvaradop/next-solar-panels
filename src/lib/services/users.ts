import { Users } from "@prisma/client"
import { ResponseAPI } from "@/lib/@types/types"

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
