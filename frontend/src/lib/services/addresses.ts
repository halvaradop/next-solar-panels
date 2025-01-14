"use server"
import { Address } from "@/lib/@types/models"
import { ResponseAPI } from "@/lib/@types/types"

/**
 * Gets all addresses from the database.
 *
 * @returns {Promise<Address[]>} - A promise that resolves to an array of addresses.
 */
export const getAddresses = async (): Promise<Address[]> => {
    "use cache"
    // @ts-expect-error
    return await prisma.address.findMany()
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
    try {
        // @ts-expect-error
        const data = await prisma.address.create({ data: address })
        return { data, ok: true, message: "Address created successfully" }
    } catch {
        return {
            data: null,
            ok: false,
            message: "An error occurred while creating the address",
        }
    }
}

/**
 * Gets an address by its ID from the database.
 *
 * @param {number} idAddress - The ID of the address to fetch.
 * @returns {Promise<Address | null>} - A promise that resolves to the address with the given ID.
 */
export const getAddressById = async (idAddress: number): Promise<Address | null> => {
    "use cache"
    // @ts-expect-error
    return await prisma.address.findUnique({
        where: { idAddress },
    })
}
