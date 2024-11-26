"use server"
import { redirect } from "next/navigation"
import { AuthError } from "next-auth"
import { auth, signIn } from "@/lib/auth"
import { Client, Project, Sample, ProjectsOnUsers, User, Zone, Address } from "@prisma/client"
import { ClientSchema, SampleSchema, UserSchema, ZoneSchema, ProjectSchema, ProjectOnUserSchema } from "./schemas"
import {
    AddProjectActionState,
    AddClientActionState,
    AddSampleActionState,
    AddUserActionState,
    AddZonesActionState,
    LoginActionState,
    AddProjectOnUserActionState,
    AddAddressActionState,
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
    /**
     * TODO: fix the zoneId
     */
    formData.set("zoneId", "9d0d8e89-81f3-41c9-b3c0-7766b26f93f1")
    const entries = Object.fromEntries(formData)
    mapToNumber(entries, ["zoneId", "userId"], false)
    const validate = SampleSchema.safeParse(entries)
    if (validate.success) {
        const request = await fetch(`http://localhost:3000/api/v1/users/${session?.user?.id}/samples`, {
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
            schema: {} as Sample,
        }
    }
    const schema = mapErrors<Sample>(validate as SafeParseError<Sample>)
    console.log("schema", schema)
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
 * TODO: fix types
 *
 * Adds a company to the database and checks if the action was successful
 *
 * @param {AddClientActionState} previous - The previous state of the company to be added
 * @param {FormData} formData - The form data sent by the user
 * @returns {Promise<AddClientActionState>} - The state of the company and the result of the action, redirecting to the dashboard if successful
 */
export const addClientAction = async (previous: AddClientActionState, formData: FormData): Promise<AddClientActionState> => {
    const entries = Object.fromEntries(formData)
    const validate = ClientSchema.safeParse(entries)
    if (validate.success) {
        const request = await fetch(`http://localhost:3000/api/v1/clients`, {
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
            schema: {} as Client,
        }
    }
    const schema = mapErrors<Client>(validate as SafeParseError<Client>)
    return {
        message: "Check the invalid fields",
        isSuccess: false,
        schema,
    }
}

/**
 *  TODO: fix types
 * Adds a zone to the database and checks if the action was successful
 *
 * @param {AddZonesActionState} previous - The previous state of the zone to be added
 * @param {FormData} formData - The form data sent by the user
 * @returns {Promise<AddZonesActionState>} - The state of the zone and the result of the action, redirecting to the dashboard if successful
 */
export const addZonesAction = async (previous: AddZonesActionState, formData: FormData): Promise<AddZonesActionState> => {
    const entries = Object.fromEntries(formData)
    mapToNumber(entries, ["longitude", "latitude"])
    const validate = ZoneSchema.safeParse(entries)
    if (validate.success) {
        const request = await fetch(`http://localhost:3000/api/v1/zones`, {
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
            schema: {} as Zone,
        }
    }
    const schema = mapErrors(validate as SafeParseError<Zone>)
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
    const entries = Object.fromEntries(formData)
    const validate = UserSchema.safeParse(entries)
    if (validate.success) {
        const request = await fetch(`http://localhost:3000/api/v1/users`, {
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
            schema: {} as User,
        }
    }
    const schema = mapErrors(validate as SafeParseError<User>)
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
    const validate = ProjectSchema.safeParse(entries)
    if (validate.success) {
        const request = await fetch(`http://localhost:3000/api/v1/projects`, {
            method: "POST",
            body: JSON.stringify({
                userId: session?.user?.id,
                ...validate.data,
            }),
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

export const addProjectOnUserAction = async (
    previous: AddProjectOnUserActionState,
    formData: FormData
): Promise<AddProjectOnUserActionState> => {
    const entries = Object.fromEntries(formData)
    const validate = ProjectOnUserSchema.safeParse(entries)
    if (validate.success) {
        const request = await fetch(`http://localhost:3000/api/v1/user-project`, {
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
            schema: {} as ProjectsOnUsers,
        }
    }
    const schema = mapErrors(validate as SafeParseError<ProjectsOnUsers>)
    return {
        message: "Check the invalid fields",
        isSuccess: false,
        schema,
    }
}

export const addAddressAction = async (previous: AddAddressActionState, formData: FormData): Promise<AddAddressActionState> => {
    const session = await auth()
    const entries = Object.fromEntries(formData)
    const validate = ProjectSchema.safeParse(entries)
    if (validate.success) {
        const request = await fetch(`http://localhost:3000/api/v1/address`, {
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
