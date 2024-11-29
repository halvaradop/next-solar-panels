import { hash, genSalt } from "bcryptjs"
import { BadRequestError } from "@/lib/errors"
import { ResponseAPI } from "@/lib/@types/types"
import { SafeParseError } from "zod"
import { Sample } from "@prisma/client"
import { merge as mergeClasses } from "@halvaradop/ui-core"

/**
 * Merges the classes and returns a string
 *
 * @param classes classes to be merged
 * @returns a string with the merged classes
 */
export const merge = mergeClasses

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

/**
 * Fetches data from the API
 *
 * @param {string} endpoint the API endpoint to fetch data from
 * @param {RequestInit} init the request options
 * @returns the response from the fetch request
 * @throws {BadRequestError} if there is an error fetching data from the API
 */
export const getFetch = async <T>(endpoint: string, init: RequestInit = {}): Promise<ResponseAPI<T>> => {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/${endpoint}`
    const { headers: headersInit, ...spread } = init
    try {
        const signal = new AbortController().signal
        const response = await fetch(URL, {
            signal,
            headers: {
                "Content-Type": "application/json",
                ...headersInit,
            },
            ...spread,
        })
        const json: ResponseAPI<T> = await response.json()
        return json
    } catch (error) {
        throw new BadRequestError(`Error fetching data from the API: ${JSON.stringify(error, null, 2)}`)
    }
}

/**
 * Extracts and maps the errors from a Zod schema validation result.
 * It removes fields that do not have errors.
 *
 * @param {SafeParseError<T>} validate - The validation result from a Zod schema.
 * @returns {T} - The mapped errors.
 */
export const mapErrors = <T>(validate: SafeParseError<T>): T => {
    const errors = validate?.error?.flatten().fieldErrors
    const schema = Object.keys(errors)
        .filter((key) => errors[key as keyof typeof errors])
        .reduce((prev, now) => ({ ...prev, [now]: errors[now as keyof typeof errors]?.at(0) }), {})
    return schema as T
}

/**
 * Adds the calculated values for b0 and b1 to the sample data.
 *
 * @param {Sample} json - The sample data to be calculated.
 * @returns {{ b0: number, b1: number }} - The calculated values for b0 and b1.
 */
export const sampleCalcs = (json: Sample): { b0: number; b1: number } => {
    const soilType = () => {
        const value = json.soilType
        if (value > 80) return -4
        if (value >= 50) return -2
        if (value >= 30) return 0
        if (value >= 10) return 2
        return 4
    }

    const soilResistivity = () => {
        const value = json.soilResistivity
        if (value > 500) return 4
        if (value >= 200) return 2
        if (value >= 50) return 0
        if (value >= 20) return -2
        if (value >= 10) return -4
        return -6
    }

    const moistureContent = () => {
        if (json.moistureContent < 20) return 0
        return -1
    }

    const pHValue = () => {
        const value = json.pHValue
        if (value > 9) return 2
        if (value >= 6) return 0
        if (value >= 4) return -1
        return -3
    }

    const bufferCapacityPH4_3 = () => {
        if (json.bufferCapacityPH4_3 > 1000) return 3
        if (json.bufferCapacityPH4_3 >= 200) return 1
        return 0
    }

    const bufferCapacityPH7_0 = () => {
        const value = json.bufferCapacityPH7_0
        if (value > 30) return -10
        if (value >= 20) return -8
        if (value >= 10) return -6
        if (value >= 5) return -4
        if (value >= 2.5) return -2
        return 0
    }

    const sulfurReducingBacteria = () => {
        if (json.sulfurReducingBacteria > 10) return -6
        if (json.sulfurReducingBacteria >= 5) return -3
        return 0
    }

    const sulfateContent = () => {
        if (json.sulfateContent > 10) return -3
        if (json.sulfateContent >= 5) return -2
        if (json.sulfateContent >= 2) return -1
        return 0
    }

    const neutralSalts = () => {
        const value = json.neutralSalts
        if (value > 100) return -4
        if (value >= 30) return -3
        if (value >= 10) return -2
        if (value >= 3) return -1
        return 0
    }

    const externalCathodes = () => {
        const value = json.externalCathodes
        if (value > -0.3) return -10
        if (value >= -0.4) return -8
        if (value >= -0.5) return -6
        return 0
    }

    const b0 = [
        soilType(),
        soilResistivity(),
        moistureContent(),
        pHValue(),
        bufferCapacityPH4_3(),
        bufferCapacityPH7_0(),
        sulfurReducingBacteria(),
        sulfateContent(),
        neutralSalts(),
        json.undergroundWaterPresence,
    ].reduce((prev, now) => prev + now, 0)

    const b1 = [
        json.horizontalSoilHomogeneity,
        json.verticalSoilHomogeneity,
        json.soilTypeHomogeneity,
        json.pHSoilHomogeneity,
        externalCathodes(),
    ].reduce((prev, now) => prev + now, 0)

    return {
        b0,
        b1,
    }
}

/**
 * Converts a camelCase string to a slashCamel string
 *
 * @param str the camelCase string
 * @returns a string with slashes separating the words
 */
export const camelCaseToHyphenCamel = (str: string): string => {
    return str.replace(/([A-Z])/g, "-$1").toLowerCase()
}
