import { Address } from "@prisma/client"
import { getFetch } from "@/lib/utils"

/**
 * Fetches all addresses from the API.
 *
 * @returns {Promise<Address[]>} - The list of addresses.
 * ```
 */
export const getAddresses = async <T extends unknown[] = Address[]>(): Promise<T> => {
    const { data } = await getFetch<T>("addresses")
    return data
}
