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

/**
 * Fetches an address by its ID from the API.
 *
 * @template T - The type of the address object, defaults to Address.
 * @param {number} addressId - The ID of the address to fetch.
 * @returns {Promise<T>} - A promise that resolves to the address with the given ID.
 */
export const getAddressById = async <T extends object = Address>(addressId: number): Promise<T> => {
    const { data } = await getFetch<T>(`addresses/${addressId}`)
    return data
}
