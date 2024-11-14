import { Companies } from "@prisma/client"
import { ResponseAPI } from "@/lib/@types/types"

export const getCompanies = async (): Promise<Companies[]> => {
    const response = await fetch("http://localhost:3000/api/v1/companies")
    const json: ResponseAPI<Companies[]> = await response.json()
    return json.data
}
