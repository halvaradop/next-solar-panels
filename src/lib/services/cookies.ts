import { getFetch } from "@/lib/utils"
import { CookieToken, ResponseAPI } from "@/lib/@types/types"

/**
 * Retrieves the project token from cookies.
 *
 * @param {string} idProject - The project ID.
 */
export const setCookieToken = async (idProject: string, idContactPerson: string) => {
    await getFetch<{}>(`cookies`, {
        method: "POST",
        body: JSON.stringify({
            idProject,
            idContactPerson,
        }),
    })
}

/**
 * Retrieves the project token from cookies.
 *
 * @returns {Promise<CookieToken>} A promise that resolves to the project token.
 */
export const getCookieToken = async (): Promise<ResponseAPI<CookieToken>> => {
    const response = await getFetch<CookieToken>(`cookies`)
    console.log("response", response)
    return response
}
