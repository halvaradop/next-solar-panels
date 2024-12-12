import { getFetch } from "@/lib/utils"

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
 * @returns {Promise<{ idProject: string; idStakeholder: string }>} A promise that resolves to the project token.
 */
export const getCookieToken = async (): Promise<{ idProject: string; idStakeholder: string }> => {
    const { data } = await getFetch<{ idProject: string; idStakeholder: string }>(`cookies`)
    return data
}
