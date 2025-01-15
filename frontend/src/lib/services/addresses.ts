/**
 * Is required the "use server" directive to use the server cache. ??
 */
"use server"
import { Address } from "@/lib/@types/models"
import { ResponseAPI } from "@/lib/@types/types"
import { getFetch } from "@/lib/utils"

/**
 * Gets all addresses from the database.
 *
 * @returns {Promise<Address[]>} - A promise that resolves to an array of addresses.
 */
export const getAddresses = async (): Promise<Address[]> => {
    "use cache"
    const { data } = await getFetch<Address[]>("address")
    return data
}

/**
 * TODO: Implement revalidateTag to refresh the cache
 *
 * Creates a new address in the database.
 *
 * @param {Address} address - The address object to create.
 * @returns {Promise<ResponseAPI<Address | null>>} - A promise that resolves to the response from the database
 */
export const createAddress = async (address: Address): Promise<ResponseAPI<Address | null>> => {
    "use cache"
    return await getFetch<Address>("address/", {
        method: "POST",
        body: JSON.stringify(address),
    })
}

/**
 * Gets an address by its ID from the database.
 *
 * @param {number} idAddress - The ID of the address to fetch.
 * @returns {Promise<Address | null>} - A promise that resolves to the address with the given ID.
 */
export const getAddressById = async (idAddress: number): Promise<Address | null> => {
    "use cache"
    const { data } = await getFetch<Address>(`address/${idAddress}`)
    return data
}
