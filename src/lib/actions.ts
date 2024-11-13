"use server"
import { redirect } from "next/navigation"
import { AuthError } from "next-auth"
import { Samples, Zones } from "@prisma/client"
import { auth, signIn } from "@/lib/auth"
import { SampleSchema, ZoneSchema } from "./schemas"
import { AddSampleActionState, AddZonesActionState, LoginActionState } from "@/lib/@types/types"
import { mapToNumber } from "./utils"

/**
 * Adds a sample to the database and checks if the action was successful
 *
 * @param previous state of the sample to be added
 * @param formData form data sent by the user
 * @returns state of the sample and the result of the action
 */
export const addSampleAction = async (previous: AddSampleActionState, formData: FormData): Promise<AddSampleActionState> => {
    const session = await auth()
    const entries = Object.fromEntries(formData)
    mapToNumber(entries, ["undergroundWaterPresence", "soilTypeHomogeneity"], false)
    const validate = SampleSchema.safeParse(entries)
    if (validate.success) {
        const request = await fetch(`http://localhost:3000/api/v1/employees/${session?.user?.id}/samples`, {
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
    const errors = validate?.error?.flatten().fieldErrors
    const schema = Object.keys(errors)
        .filter((key) => errors[key as keyof typeof errors])
        .reduce((prev, now) => ({ ...prev, [now]: errors[now as keyof typeof errors]?.at(0) }), {})
    return {
        message: "Check the invalid fields",
        isSuccess: false,
        schema: schema as Samples,
    }
}

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

export const addZonesAction = async (previous: AddZonesActionState, formData: FormData): Promise<AddZonesActionState> => {
    const session = await auth()
    const entries = Object.fromEntries(formData)
    const validate = ZoneSchema.safeParse(entries)
    if (validate.success) {
        const request = await fetch(`http://localhost:3000/api/v1/employees/${session?.user?.id}/zones`, {
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

    const errors = validate?.error?.flatten().fieldErrors
    const schema = Object.keys(errors)
        .filter((key) => errors[key as keyof typeof errors])
        .reduce((prev, now) => ({ ...prev, [now]: errors[now as keyof typeof errors]?.at(0) }), {})
    return {
        message: "Check the invalid fields",
        isSuccess: false,
        schema: schema as Zones,
    }
}
