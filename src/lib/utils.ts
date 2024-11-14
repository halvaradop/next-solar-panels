import { twMerge } from "tw-merge"
import clsx, { ClassValue } from "clsx"
import { hash, genSalt } from "bcryptjs"

/**
 * Merges the classes and returns a string
 *
 * @param classes classes to be merged
 * @returns a string with the merged classes
 */
export const merge = (...classes: ClassValue[]): string => {
    return twMerge(clsx(classes.filter(Boolean)))
}

/**
 * Maps the fields of an object to a number
 *
 * @param entries object to be mapped
 * @param fields the name of the fields to be mapped or to be excluded
 * @param include true if the fields are to be mapped, false if the fields are to be excluded
 */
export const mapToNumber = (entries: Record<string, unknown>, fields: string[], include: boolean = true): void => {
    if (include) {
        fields.map((field) => (entries[field] = Number(entries[field])))
    } else {
        Object.keys(entries).map((key) => {
            if (!fields.includes(key) && entries[key]) {
                entries[key] = Number(entries[key])
            }
        })
    }
}

/**
 * Converts a camelCase string to a string separated by spaces
 *
 * @param str the camelCase string
 * @returns a string with spaces separating the words
 */
export const camelCaseToWords = (str: string): string => {
    return str.replace(/([A-Z])/g, " $1").trim()
}

/**
 * Encrypts a string using bcrypt with a salt of 10
 *
 * @param data the string to be encrypted
 * @returns the encrypted string
 */
export const encrypt = async (data: string): Promise<string> => {
    const salt = await genSalt(10)
    return hash(data, salt)
}
