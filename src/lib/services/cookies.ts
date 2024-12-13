import { getFetch } from "@/lib/utils"
import { CookieToken, ResponseAPI } from "../@types/types"
import { revalidateTag } from "next/cache"

/**
 * Retrieves the project token from cookies.
 *
 * @param {string} projectId - The project ID.
 * @returns {Promise<{}>} A promise that resolves to the project token.
 */
export const setCookieToken = async (projectId: string): Promise<{}> => {
    const { data } = await getFetch<{}>(`cookies`, {
        method: "POST",
        body: JSON.stringify({ idProject: projectId }),
    })
    return data
}

/**
 * Retrieves the project token from cookies.
 *
 * @returns {Promise<CookieToken>} A promise that resolves to the project token.
 */
export const getCookieToken = async (): Promise<ResponseAPI<CookieToken>> => {
    const response = await getFetch<CookieToken>(`cookies`, {
        cache: "force-cache",
    })
    console.log("Cookie token:", response)
    return response
}
