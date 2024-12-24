"use server"
import { redirect } from "next/navigation"
import { AuthError } from "next-auth"
import { auth, signIn } from "@/lib/auth"
import { Project, Address, StakeHolder, PositionSoilData, Field, ContactPerson, PositionData } from "@prisma/client"
import {
    StakeHolderSchema,
    PositionSoilDataSchema,
    ContactPersonSchema,
    FiledSchema,
    ProjectSchema,
    AddressSchema,
    PositionDataSchema,
} from "./schemas"
import {
    AddProjectActionState,
    AddStakeHolderActionState,
    AddPositionSoilDatasPageActionState,
    AddContactPersonActionState,
    AddFieldsActionState,
    LoginActionState,
    AddAddressActionState,
    AddPositionDataActionState,
} from "@/lib/@types/types"
import { mapErrors, mapToNumber } from "./utils"
import { SafeParseError } from "zod"
import { createAddress } from "./services"

/**
 * Adds a sample to the database and checks if the action was successful
 *
 * @param {AddPositionSoilDatasPageActionState} previous - The previous state of the sample to be added
 * @param {FormData} formData - The form data sent by the user
 * @returns {Promise<AddPositionSoilDatasPageActionState>} - The state of the sample and the result of the action, redirecting to the dashboard if successful
 */
export const addPositionSoilDatasPageAction = async (
    previous: AddPositionSoilDatasPageActionState,
    formData: FormData
): Promise<AddPositionSoilDatasPageActionState> => {
    const session = await auth()
    formData.set("idContactPerson", session?.user?.id as string)
    const entries = Object.fromEntries(formData)
    mapToNumber(entries, ["idContactPerson"], false)
    const validate = PositionSoilDataSchema.safeParse(entries)
    if (validate.success) {
        const request = await fetch(`http://localhost:3000/api/v1/contact-people/${session?.user?.id}/position-soil-datas`, {
            method: "POST",
            body: JSON.stringify(validate.data),
        })
        const { message, ok } = await request.json()
        if (request.ok && ok) {
            redirect("/dashboard")
        }
        return {
            message,
            isSuccess: false,
            schema: {} as PositionSoilData,
        }
    }
    const schema = mapErrors<PositionSoilData>(validate as SafeParseError<PositionSoilData>)
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
    redirect("/dashboard/projects")
}

/**
 * Adds a stake Holder to the database and checks if the action was successful
 *
 * @param {AddContacPersonActionState} previous - The previous state of the stake Holder to be added
 * @param {FormData} formData - The form data sent by the user
 * @returns {Promise<AddContacPersonActionState>} - The state of the stake Holder and the result of the action, redirecting to the dashboard if successful
 */
export const addStakeHolderAction = async (
    previous: AddStakeHolderActionState,
    formData: FormData
): Promise<AddStakeHolderActionState> => {
    const entries = Object.fromEntries(formData)
    const validate = StakeHolderSchema.safeParse(entries)
    if (validate.success) {
        const request = await fetch(`http://localhost:3000/api/v1/stake-holders`, {
            method: "POST",
            body: JSON.stringify(validate.data),
        })
        const { message, ok } = await request.json()
        if (request.ok && ok) {
            redirect("/dashboard")
        }
        return {
            message,
            isSuccess: false,
            schema: {} as StakeHolder,
        }
    }
    const schema = mapErrors<StakeHolder>(validate as SafeParseError<StakeHolder>)
    return {
        message: "Check the invalid fields",
        isSuccess: false,
        schema,
    }
}

/**
 * Adds a zone to the database and checks if the action was successful
 *
 * @param {AddFieldsActionState} previous - The previous state of the zone to be added
 * @param {FormData} formData - The form data sent by the user
 * @returns {Promise<AddFieldsActionState>} - The state of the zone and the result of the action, redirecting to the dashboard if successful
 */
export const addFieldsAction = async (previous: AddFieldsActionState, formData: FormData): Promise<AddFieldsActionState> => {
    const entries = Object.fromEntries(formData)
    mapToNumber(entries, ["longitude", "latitude"], true)
    const validate = FiledSchema.safeParse(entries)
    if (validate.success) {
        const request = await fetch(`http://localhost:3000/api/v1/fields`, {
            method: "POST",
            body: JSON.stringify(entries),
        })
        const { message, ok } = await request.json()
        if (request.ok && ok) {
            redirect("/dashboard")
        }
        return {
            message,
            isSuccess: false,
            schema: {} as Field,
        }
    }
    const schema = mapErrors(validate as SafeParseError<Field>)
    return {
        message: "Check the invalid fields",
        isSuccess: false,
        schema,
    }
}

/**
 * Adds a new user to the database and checks if the action was successful
 *
 * @param {AddContactPersonActionState} previous - The previous state of the user to be added
 * @param {FormData} formData - The form data sent by the user
 * @returns {Promise<AddContactPersonActionState>} - The state of the user and the result of the action, redirecting to the dashboard if successful
 */
export const addContactPersonAction = async (
    previous: AddContactPersonActionState,
    formData: FormData
): Promise<AddContactPersonActionState> => {
    const entries = Object.fromEntries(formData)
    const validate = ContactPersonSchema.safeParse(entries)
    if (validate.success) {
        const request = await fetch(`http://localhost:3000/api/v1/contact-people`, {
            method: "POST",
            body: JSON.stringify(validate.data),
        })
        const { message, ok } = await request.json()
        if (request.ok && ok) {
            redirect("/dashboard")
        }
        return {
            message,
            isSuccess: false,
            schema: {} as ContactPerson,
        }
    }
    const schema = mapErrors(validate as SafeParseError<ContactPerson>)
    return {
        message: "Check the invalid fields",
        isSuccess: false,
        schema,
    }
}

/**
 * Adds a new plant to the database and checks if the action was successful.
 *
 * @param {AddProjectActionState} previous - The previous state of the plant to be added.
 * @param {FormData} formData - The form data sent by the user.
 * @returns {Promise<AddProjectActionState>} - The state of the plant and the result of the action, redirecting to the dashboard if successful.
 */
export const addProjectAction = async (previous: AddProjectActionState, formData: FormData): Promise<AddProjectActionState> => {
    const session = await auth()
    const entries = Object.fromEntries(formData)
    console.log(entries)
    mapToNumber(entries, ["longitude", "latitude"])
    const validate = ProjectSchema.safeParse(entries)
    console.log(validate)
    if (validate.success) {
        const request = await fetch(`http://localhost:3000/api/v1/projects`, {
            method: "POST",
            body: JSON.stringify(validate.data),
        })
        const { message, ok } = await request.json()
        if (request.ok && ok) {
            redirect("/dashboard")
        }
        return {
            message,
            isSuccess: false,
            schema: {} as Project,
        }
    }
    const schema = mapErrors(validate as SafeParseError<Project>)
    return {
        message: "Check the invalid fields",
        isSuccess: false,
        schema,
    }
}

export const addAddressAction = async (previous: AddAddressActionState, formData: FormData): Promise<AddAddressActionState> => {
    const entries = Object.fromEntries(formData)
    const validate = AddressSchema.safeParse(entries)

    if (validate.success) {
        const { ok, message } = await createAddress(validate.data as Address)
        if (ok) {
            redirect("/dashboard")
        }
        return {
            message: message ?? "An error occurred while creating the address",
            isSuccess: false,
            schema: {} as Address,
        }
    }
    const schema = mapErrors(validate as SafeParseError<Address>)
    return {
        message: "Check the invalid fields",
        isSuccess: false,
        schema,
    }
}

export const addPositionDataAction = async (
    previous: AddPositionDataActionState,
    formData: FormData
): Promise<AddPositionDataActionState> => {
    const entries = Object.fromEntries(formData)
    mapToNumber(entries, ["longitude", "latitude"])
    entries.grounding = entries.grounding ?? null
    const validate = PositionDataSchema.safeParse(entries)
    if (validate.success) {
        const request = await fetch(`http://localhost:3000/api/v1/position-datas`, {
            method: "POST",
            body: JSON.stringify(validate.data),
        })
        const { message, ok } = await request.json()
        if (request.ok && ok) {
            redirect("/dashboard")
        }
        return {
            message,
            isSuccess: false,
            schema: {} as PositionData,
        }
    }
    const schema = mapErrors(validate as SafeParseError<PositionData>)
    return {
        message: "Check the invalid position data",
        isSuccess: false,
        schema,
    }
}
