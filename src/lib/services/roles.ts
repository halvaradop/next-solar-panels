import { Roles } from "@prisma/client"
import { ResponseAPI } from "@/lib/@types/types"

export const getRoles = async (): Promise<Roles[]> => {
    const response = await fetch("http://localhost:3000/api/v1/roles")
    const json: ResponseAPI<Roles[]> = await response.json()
    return json.data
}
