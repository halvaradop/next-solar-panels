import { getFetch } from "@/lib/utils"
import { CookieToken, ResponseAPI } from "@/lib/@types/types"
import { auth } from "@/lib/auth"

/**
 * Retrieves the project token from cookies.
 *
 * @param {string} projectId - The project ID.
 * @returns {Promise<{}>} A promise that resolves to the project token.
 */
export const setCookieToken = async (projectId: string): Promise<{}> => {
    const session = await auth()
    if (!session) return Promise.resolve({})
    const { data } = await getFetch<{}>(`cookies`, {
        method: "POST",
        body: JSON.stringify({
            idProject: projectId,
            idContactPerson: session.user.id,
        }),
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
    return response
}
