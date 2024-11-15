"use server"
import { redirect } from "next/navigation"
import { AuthError } from "next-auth"
import { auth, signIn } from "@/lib/auth"
import { Companies, Plants, Samples, Users, Zones } from "@prisma/client"
import { CompanySchema, SampleSchema, UserSchema, ZoneSchema, PlantSchema } from "./schemas"
import {
    AddPlantActionState,
    AddCompanieActionState,
    AddSampleActionState,
    AddUserActionState,
    AddZonesActionState,
    LoginActionState,
} from "@/lib/@types/types"
import { mapErrors, mapToNumber } from "./utils"
import { SafeParseError } from "zod"

/**
 * Adds a sample to the database and checks if the action was successful
 *
 * @param {AddSampleActionState} previous - The previous state of the sample to be added
 * @param {FormData} formData - The form data sent by the user
 * @returns {Promise<AddSampleActionState>} - The state of the sample and the result of the action, redirecting to the dashboard if successful
 */
export const addSampleAction = async (previous: AddSampleActionState, formData: FormData): Promise<AddSampleActionState> => {
    const session = await auth()
    formData.set("userId", session?.user?.id as string)
    const entries = Object.fromEntries(formData)
    mapToNumber(entries, ["undergroundWaterPresence", "soilTypeHomogeneity"], false)
    const validate = SampleSchema.safeParse(entries)
    if (validate.success) {
        const request = await fetch(`http://localhost:3000/api/v1/users/${session?.user?.id}/samples`, {
            method: "POST",
            body: JSON.stringify(validate.data),
        })
        if (request.ok) {
            redirect("/dashboard")
        }
        return {
            message: "Failed to add the sample",
            isSuccess: false,
            schema: {} as Samples,
        }
    }
    const schema = mapErrors<Samples>(validate as SafeParseError<Samples>)
    return {
        message: "Check the invalid fields",
        isSuccess: false,
        schema,
    }
}

/**
 * Logs in the user using the credentials provider and redirects to the dashboard if successful.
 *
 * @param {LoginActionState} previous - The previous state of the login action.
 * @param {FormData} formData - The form data sent by the user.
 * @returns {Promise<LoginActionState>} - The state of the login action, redirecting to the dashboard if successful.
 */
export const loginAction = async (previous: LoginActionState, formData: FormData): Promise<LoginActionState> => {
    try {
        await signIn("credentials", formData)
    } catch (error) {
        if (error instanceof AuthError) {
            return { message: "Unauthorized", isSuccess: false } as LoginActionState
        }
    }
    redirect("/dashboard")
}

/**
 * Adds a company to the database and checks if the action was successful
 *
 * @param {AddCompanieActionState} previous - The previous state of the company to be added
 * @param {FormData} formData - The form data sent by the user
 * @returns {Promise<AddCompanieActionState>} - The state of the company and the result of the action, redirecting to the dashboard if successful
 */
export const addCompanyAction = async (previous: AddCompanieActionState, formData: FormData): Promise<AddCompanieActionState> => {
    const session = await auth()
    const entries = Object.fromEntries(formData)
    const validate = CompanySchema.safeParse(entries)
    if (validate.success) {
        const request = await fetch(`http://localhost:3000/api/v1/users/${session?.user?.id}/companies`, {
            method: "POST",
            body: JSON.stringify(validate.data),
        })
        const result = await request.json()
        if (request.ok) {
            if (!result.ok) {
                return {
                    message: result.message,
                    isSuccess: result.ok,
                    schema: {} as Companies,
                }
            }
            redirect("/dashboard")
        }

        return {
            message: "Failed to add the company",
            isSuccess: false,
            schema: {} as Companies,
        }
    }
    const schema = mapErrors<Companies>(validate as SafeParseError<Companies>)
    return {
        message: "Check the invalid fields",
        isSuccess: false,
        schema,
    }
}

/**
 * Adds a zone to the database and checks if the action was successful
 *
 * @param {AddZonesActionState} previous - The previous state of the zone to be added
 * @param {FormData} formData - The form data sent by the user
 * @returns {Promise<AddZonesActionState>} - The state of the zone and the result of the action, redirecting to the dashboard if successful
 */
export const addZonesAction = async (previous: AddZonesActionState, formData: FormData): Promise<AddZonesActionState> => {
    const session = await auth()
    const entries = Object.fromEntries(formData)
    mapToNumber(entries, ["name"], false)
    const validate = ZoneSchema.safeParse(entries)
    if (validate.success) {
        const request = await fetch(`http://localhost:3000/api/v1/users/${session?.user?.id}/zones`, {
            method: "POST",
            body: JSON.stringify(validate.data),
        })
        if (request.ok) {
            redirect("/dashboard")
        }
        return {
            message: "Check the invalid fields",
            isSuccess: false,
            schema: {} as Zones,
        }
    }
    const schema = mapErrors(validate as SafeParseError<Zones>)
    return {
        message: "Check the invalid fields",
        isSuccess: false,
        schema,
    }
}

/**
 * Adds a new user to the database and checks if the action was successful
 *
 * @param {AddUserActionState} previous - The previous state of the user to be added
 * @param {FormData} formData - The form data sent by the user
 * @returns {Promise<AddUserActionState>} - The state of the user and the result of the action, redirecting to the dashboard if successful
 */
export const addUserAction = async (previous: AddUserActionState, formData: FormData): Promise<AddUserActionState> => {
    const session = await auth()
    const entries = Object.fromEntries(formData)

    const validate = UserSchema.safeParse(entries)

    if (validate.success) {
        const request = await fetch(`http://localhost:3000/api/v1/users/${session?.user?.id}/users`, {
            method: "POST",
            body: JSON.stringify(validate.data),
        })
        const result = await request.json()
        if (request.ok) {
            if (!result.ok) {
                return {
                    message: result.message,
                    isSuccess: result.ok,
                    schema: {} as Users,
                }
            }
            redirect("/dashboard")
        }

        return {
            message: "Failed to add the sample",
            isSuccess: false,
            schema: {} as Users,
        }
    }
    const schema = mapErrors(validate as SafeParseError<Users>)
    return {
        message: "Check the invalid fields",
        isSuccess: false,
        schema,
    }
}

/**
 * Adds a new plant to the database and checks if the action was successful.
 *
 * @param {AddPlantActionState} previous - The previous state of the plant to be added.
 * @param {FormData} formData - The form data sent by the user.
 * @returns {Promise<AddPlantActionState>} - The state of the plant and the result of the action, redirecting to the dashboard if successful.
 */
export const addPlantAction = async (previous: AddPlantActionState, formData: FormData): Promise<AddPlantActionState> => {
    const session = await auth()
    const entries = Object.fromEntries(formData)
    const validate = PlantSchema.safeParse(entries)
    if (validate.success) {
        const request = await fetch(`http://localhost:3000/api/v1/users/${session?.user?.id}/plants`, {
            method: "POST",
            body: JSON.stringify(validate.data),
        })
        const result = await request.json()
        if (request.ok) {
            if (!result.ok) {
                return {
                    message: result.message,
                    isSuccess: result.ok,
                    schema: {} as Plants,
                }
            }
            redirect("/dashboard")
        }
        return {
            message: "Failed to add the sample",
            isSuccess: false,
            schema: {} as Plants,
        }
    }
    const schema = mapErrors(validate as SafeParseError<Plants>)
    return {
        message: "Check the invalid fields",
        isSuccess: false,
        schema,
    }
}
