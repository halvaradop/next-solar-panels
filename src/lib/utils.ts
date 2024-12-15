import { hash, genSalt } from "bcryptjs"
import { BadRequestError } from "@/lib/errors"
import { ResponseAPI } from "@/lib/@types/types"
import { SafeParseError } from "zod"
import { PositionSoilData } from "@prisma/client"
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
 * Adds the calculated values for b0 and b1 to the sample data.
 *Todo Fix
 * @param {Sample} json - The sample data to be calculated.
 * @returns {{ b0: number, b1: number }} - The calculated values for b0 and b1.
 */
export const sampleCalcs = (json: PositionSoilData): { b0: number; b1: number } => {
    const soilType = () => {
        const value = json.z1
        if (value > 80) return -4
        if (value >= 50) return -2
        if (value >= 30) return 0
        if (value >= 10) return 2
        return 4
    }

    const soilResistivity = () => {
        const value = json.z2
        if (value > 500) return 4
        if (value >= 200) return 2
        if (value >= 50) return 0
        if (value >= 20) return -2
        if (value >= 10) return -4
        return -6
    }

    const moistureContent = () => {
        if (json.z3 < 20) return 0
        return -1
    }

    const pHValue = () => {
        const value = json.z4
        if (value > 9) return 2
        if (value >= 6) return 0
        if (value >= 4) return -1
        return -3
    }

    const bufferCapacityPH4_3 = () => {
        if (json.z5 > 1000) return 3
        if (json.z5 >= 200) return 1
        return 0
    }

    const bufferCapacityPH7_0 = () => {
        const value = json.z6
        if (value > 30) return -10
        if (value >= 20) return -8
        if (value >= 10) return -6
        if (value >= 5) return -4
        if (value >= 2.5) return -2
        return 0
    }

    const sulfurReducingBacteria = () => {
        if (json.z7 > 10) return -6
        if (json.z7 >= 5) return -3
        return 0
    }

    const sulfateContent = () => {
        if (json.z8 > 10) return -3
        if (json.z8 >= 5) return -2
        if (json.z8 >= 2) return -1
        return 0
    }

    const neutralSalts = () => {
        const value = json.z9
        if (value > 100) return -4
        if (value >= 30) return -3
        if (value >= 10) return -2
        if (value >= 3) return -1
        return 0
    }

    const externalCathodes = () => {
        const value = json.z10
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
        json.z11,
    ].reduce((prev, now) => prev + now, 0)

    const b1 = [json.z12, json.z13, json.z14, json.z15, externalCathodes()].reduce((prev, now) => prev + now, 0)

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

export const evalutionGrosor = (
    json: PositionSoilData
): { valueb0: string; valueb1: string; steel: string; galvanising: string; message: string } => {
    let message = ""
    let steel = ""
    let galvanising = ""
    const soilResistivity = json.z2
    const ph = json.z4
    const sulfateContent = json.z8 * 96.06
    //const chlorideContent = json.chlorideContent * 35.45;

    const valueb0: string = (() => {
        const value = json.b0
        if (value >= 0) return "very low|la"
        if (value < -1 && value > -4) return "low|lb"
        if (value <= -5 && value > -10) return "II|Medium"
        if (value <= -10) return "III|High"
        return "nothihg"
    })()
    const valueb1: string = (() => {
        const value = json.b1
        if (value >= 0) return "very low|very low"
        if (value < -1 && value >= -4) return "low|very low"
        if (value <= -5 && value >= -10) return "low|Medium"
        if (value < -10) return "High | Medium"
        return "nothihg"
    })()

    if (soilResistivity >= 100) {
        if (ph >= 5.2 && ph <= 11.8) {
            steel = "15 for the first two years, 4 for subsequent years µm/y "
            galvanising = "12 µm/y"
        } else {
            steel = valueSteel(ph, soilResistivity).steel
            galvanising = valueGalvanised(ph, soilResistivity).Galvanised
        }
    } else if (soilResistivity > 20 && soilResistivity < 100) {
        if (ph >= 6.2 && ph <= 9.8) {
            steel = "15 for the first two years, 4 for subsequent years µm/y "
            galvanising = "12 µm/y"
        } else {
            steel = valueSteel(ph, soilResistivity).steel
            galvanising = valueGalvanised(ph, soilResistivity).Galvanised
        }
    } else if (soilResistivity > 5 && soilResistivity <= 20) {
        if (ph >= 5.2 && ph <= 9.8) {
            steel = "15 for the first two years, 4 for subsequent years µm/y"
            galvanising = "15 for the first two years, 4 for subsequent years µm/y"
        } else {
            steel = valueSteel(ph, soilResistivity).steel
            galvanising = valueGalvanised(ph, soilResistivity).Galvanised
        }
    } else if (soilResistivity <= 5) {
        message =
            "\nThe value of specific soil resistivity is too low, loss rates cannot be determined. Please seek expert advice."
    }

    /* 
    TODO: implement

    const reespuest = valueSteel(ph , soilResistivity)
    if (chlorideContent <= 200 && sulfateContent <= 1000) {
        steel
        galvanising
    } else if (chlorideContent > 200 || sulfateContent > 1000) {
        steel = valueSteel(ph , soilResistivity).steel
        galvanising = valueGalvanised(ph, soilResistivity).Galvanised
    }
    */

    if (json.z4) {
        message += "\nAlert: Presence of groundwater detected. Consider alternative materials."
    }
    return { valueb0, valueb1, steel, galvanising, message }
}

export const compiledSample = (
    json: PositionSoilData[]
): {
    valueb0Min: number
    valueb0Max: number
    valueb1Max: number
    valueb1Min: number
    valueMaxSteel: number
    valueMinSteel: number
    valueMaxGalvanising: number
    valueMinGalvanising: number
} => {
    let valueb0Min = 0
    let valueb0Max = 0
    let valueb1Max = 0
    let valueb1Min = 0
    let valueMaxSteel = 0
    let valueMinSteel = 0
    let valueMaxGalvanising = 0
    let valueMinGalvanising = 0

    json.forEach((data) => {
        if (data.b0 !== undefined) {
            valueb0Max = Math.max(valueb0Max, data.b0)
            valueb0Min = Math.min(valueb0Min, data.b0)
        }

        if (data.b1 !== undefined) {
            valueb1Max = Math.max(valueMaxGalvanising, data.b1)
            valueb1Min = Math.min(valueMinGalvanising, data.b1)
        }

        valueMaxSteel = Math.max(valueSteel(data.z4, data.z2).valueMax, valueMaxSteel)
        valueMinSteel = Math.min(valueSteel(data.z4, data.z2).valueMin, valueMinSteel)

        valueMaxGalvanising = Math.max(valueGalvanised(data.z4, data.z2).valueMax, valueMaxGalvanising)
        valueMinGalvanising = Math.min(valueGalvanised(data.z4, data.z2).valueMin, valueMinGalvanising)
    })

    return {
        valueb1Max,
        valueb1Min,
        valueb0Max,
        valueb0Min,
        valueMaxSteel,
        valueMinSteel,
        valueMaxGalvanising,
        valueMinGalvanising,
    }
}

export const valueSteel = (ph: number, soilResistivity: number): { steel: string; valueMax: number; valueMin: number } => {
    let valueDrained = 0
    let valueNotDrained = 0
    if (ph > 5) {
        valueDrained = 10
        valueNotDrained = 10
    } else if (ph >= 4 && ph <= 5) {
        valueDrained = 10
        valueNotDrained = 20
    } else if (ph >= 3 && ph <= 3.9) {
        valueDrained = 20
        valueNotDrained = 40
    } else {
        valueDrained = 40
        valueNotDrained = 300
    }
    if (soilResistivity > 50) {
        valueDrained = Math.max(valueDrained, 10)
        valueNotDrained = Math.max(valueNotDrained, 10)
    } else if (soilResistivity >= 20 && soilResistivity <= 50) {
        valueDrained = Math.max(valueDrained, 10)
        valueNotDrained = Math.max(valueNotDrained, 20)
    } else if (soilResistivity >= 10 && soilResistivity <= 20) {
        valueDrained = Math.max(valueDrained, 20)
        valueNotDrained = Math.max(valueNotDrained, 40)
    } else {
        valueDrained = Math.max(valueDrained, 40)
        valueNotDrained = Math.max(valueNotDrained, 300)
    }

    const valueMax = Math.max(valueDrained, valueNotDrained)
    const valueMin = Math.max(valueDrained, valueNotDrained)
    const steel =
        "corrosion loss on dreanable soils is " +
        valueDrained +
        "µm/y|corrosion loss in non-drainable soils is " +
        valueNotDrained +
        "µm/y"
    return {
        valueMin,
        valueMax,
        steel,
    }
}

export const valueGalvanised = (
    ph: number,
    soilResistivity: number
): { Galvanised: string; valueMax: number; valueMin: number } => {
    let valueDrained = 0
    let valueNotDrained = 0
    if (ph > 4) {
        valueDrained = 6.5
        valueNotDrained = 20
    } else if (ph >= 4 && ph <= 4.9) {
        valueDrained = 5.2
        valueNotDrained = 13.3
    } else if (ph >= 5 && ph <= 7.9) {
        valueDrained = 4.3
        valueNotDrained = 11
    } else if (ph >= 8 && ph <= 9) {
        valueDrained = 6.5
        valueNotDrained = 12.1
    } else {
        valueDrained = 8.6
        valueNotDrained = 17.2
    }

    if (soilResistivity > 5) {
        valueDrained = Math.max(valueDrained, 3.5)
        valueNotDrained = valueDrained
    } else if (soilResistivity >= 5 && soilResistivity <= 10) {
        valueDrained = Math.max(valueDrained, 3.5)
        valueNotDrained = valueDrained
    } else if (soilResistivity >= 10 && soilResistivity <= 20) {
        valueDrained = Math.max(valueDrained, 1.5)
        valueNotDrained = valueDrained
    } else if (soilResistivity >= 20 && soilResistivity <= 50) {
        valueDrained = Math.max(valueDrained, 1.5)
        valueNotDrained = valueDrained
    } else {
        valueDrained = Math.max(valueDrained, 1)
        valueNotDrained = valueDrained
    }
    const valueMax = Math.max(valueDrained, valueNotDrained)
    const valueMin = Math.max(valueDrained, valueNotDrained)
    const Galvanised =
        "corrosion loss on dreanable soils is " +
        valueDrained +
        "µm/y|corrosion loss in non-drainable soils is " +
        valueNotDrained +
        "µm/y"
    return {
        valueMin,
        valueMax,
        Galvanised,
    }
}
