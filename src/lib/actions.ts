"use server"
import { redirect } from "next/navigation"
import { AuthError } from "next-auth"
import { auth, signIn } from "@/lib/auth"
import { Client, Project, Sample, ProjectsOnUsers, User, Zone } from "@prisma/client"
import { ClientSchema, SampleSchema, UserSchema, ZoneSchema, ProjectSchema, ProjectOnUserSchema } from "./schemas"
import {
    AddProjectActionState,
    AddClientActionState,
    AddSampleActionState,
    AddUserActionState,
    AddZonesActionState,
    LoginActionState,
    AddProjectOnUserActionState,
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
            schema: {} as Sample,
        }
    }
    const schema = mapErrors<Sample>(validate as SafeParseError<Sample>)
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
    console.log(entries)
    const validate = ClientSchema.safeParse(entries)
    console.log(validate)
    if (validate.success) {
        const request = await fetch(`http://localhost:3000/api/v1/clients`, {
            method: "POST",
            body: JSON.stringify(validate.data),
        })
        const result = await request.json()
        if (request.ok) {
            if (!result.ok) {
                return {
                    message: result.message,
                    isSuccess: result.ok,
                    schema: {} as Client,
                }
            }
            redirect("/dashboard")
        }

        return {
            message: "Failed to add the company",
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
    //mapToNumber(entries, ["name"], false)
    const validate = ZoneSchema.safeParse(entries)
    if (validate.success) {
        const request = await fetch(`http://localhost:3000/api/v1/zones`, {
            method: "POST",
            body: JSON.stringify(validate.data),
        })
        if (request.ok) {
            redirect("/dashboard")
        }
        return {
            message: "Check the invalid fields",
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
        const result = await request.json()
        if (request.ok) {
            if (!result.ok) {
                return {
                    message: result.message,
                    isSuccess: result.ok,
                    schema: {} as User,
                }
            }
            redirect("/dashboard")
        }

        return {
            message: "Failed to add the user",
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
    console.log(entries)
    const validate = ProjectSchema.safeParse(entries)
    console.log(validate)
    if (validate.success) {
        const request = await fetch(`http://localhost:3000/api/v1/projects`, {
            method: "POST",
            body: JSON.stringify({
                userId: session?.user?.id,
                ...validate.data,
            }),
        })
        const result = await request.json()
        if (request.ok) {
            if (!result.ok) {
                return {
                    message: result.message,
                    isSuccess: result.ok,
                    schema: {} as Project,
                }
            }
            redirect("/dashboard")
        }
        return {
            message: "Failed to add the project",
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
        const result = await request.json()
        if (request.ok) {
            if (!result.ok) {
                return {
                    message: result.message,
                    isSuccess: result.ok,
                    schema: {} as ProjectsOnUsers,
                }
            }
            redirect("/dashboard")
        }
        return {
            message: "Failed to add the Uset to plant",
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
