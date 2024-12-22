import { hash, genSalt } from "bcryptjs"
import { BadRequestError } from "@/lib/errors"
import { CookieToken, ResponseAPI } from "@/lib/@types/types"
import { SafeParseError } from "zod"
import { merge as mergeClasses } from "@halvaradop/ui-core"
import { getCookieToken } from "./services/cookies"
import { redirect } from "next/navigation"

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
 * @param {Record<string, unknown>} entries - object to be mapped
 * @param {string[]} fields - the name of the fields to be mapped or to be excluded
 * @param {boolean} include - true if the fields are to be mapped, false if the fields are to be excluded
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
 * Converts a camelCase string to a slashCamel string
 *
 * @param str the camelCase string
 * @returns a string with slashes separating the words
 */
export const camelCaseToHyphenCamel = (str: string): string => {
    return str.replace(/([A-Z])/g, "-$1").toLowerCase()
}

/**
 * TODO: implement
 *
 * Generate a gradient avatar based in the name
 *
 * @param name of the avatar
 * @param size of the svg returned
 */
export const getAvatar = async () => {
    return await fetch(`https://avatar.iran.liara.run/public/boy`, {
        cache: "force-cache",
        next: {
            revalidate: 60 * 60 * 24 * 7 * 4 * 12,
        },
    })
}

/**
 * Get the session token from `getCookieToken` function. This function is used
 * to wrap the `getCookieToken` function and return the token from the response.
 * If the response is not ok, it will redirect to the dashboard page with an error.
 *
 * @returns {Promise<CookieToken>} the session token
 */
export const getSessionToken = async (): Promise<CookieToken> => {
    const { ok, data } = await getCookieToken()
    if (!ok) {
        return redirect("/dashboard?error=You need to select a stakeholder first")
    }
    return data
}
