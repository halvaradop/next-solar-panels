import { Companies } from "@prisma/client"
import { getFetch } from "@/lib/utils"

/**
 * Fetches all companies from the database
 *
 * @returns {Promise<Companies[]>} - A list of companies
 */
export const getCompanies = async (): Promise<Companies[]> => {
    const { data } = await getFetch<Companies[]>("companies")
    return data
}
