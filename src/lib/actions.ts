"use server"
import { redirect } from "next/navigation"
import { AuthError } from "next-auth"
import { auth, signIn } from "@/lib/auth"
import { CompanySchema, PlantSchema, SampleSchema, UserSchema } from "./schemas"
import { AddCompanieActionState, AddPlantActionState, AddSampleActionState, AddUserActionState, LoginActionState } from "@/lib/@types/types"
import { Companies, Plants, Samples, Users } from "@prisma/client"
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

export const addCompanyAction = async (previous: AddCompanieActionState, formData: FormData): Promise<AddCompanieActionState> => {
    const session = await auth()
    const entries = Object.fromEntries(formData)
    const validate = CompanySchema.safeParse(entries)
    if (validate.success) {
        const request = await fetch(`http://localhost:3000/api/v1/employees/${session?.user?.id}/companies`, {
            method: "POST",
            body: JSON.stringify(validate.data),
        })
        const result = await request.json()
        if (request.ok) {
            if(!result.ok){
                return {
                    message: result.message ,
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
    const errors = validate?.error?.flatten().fieldErrors
    const schema = Object.keys(errors)
        .filter((key) => errors[key as keyof typeof errors])
        .reduce((prev, now) => ({ ...prev, [now]: errors[now as keyof typeof errors]?.at(0) }), {})
    return {
        message: "Check the invalid fields",
        isSuccess: false,
        schema: schema as Companies,
    }
}

export const addUserAction = async (previous: AddUserActionState, formData: FormData): Promise<AddUserActionState> => {
    const session = await auth()
    const entries = Object.fromEntries(formData)

    const validate = UserSchema.safeParse(entries)
 
  
    if (validate.success) {
        const request = await fetch(`http://localhost:3000/api/v1/employees/${session?.user?.id}/users`, {
            method: "POST",
            body: JSON.stringify(validate.data),
        })
        const result = await request.json()
        if (request.ok) {
            if(!result.ok){
                return {
                    message: result.message ,
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
    const errors = validate?.error?.flatten().fieldErrors
    const schema = Object.keys(errors)
        .filter((key) => errors[key as keyof typeof errors])
        .reduce((prev, now) => ({ ...prev, [now]: errors[now as keyof typeof errors]?.at(0) }), {})
    return {
        message: "Check the invalid fields",
        isSuccess: false,
        schema: schema as Users,
    }
}

export const addPlantAction = async (previous: AddPlantActionState, formData: FormData): Promise<AddPlantActionState> => {
    const session = await auth()
    const entries = Object.fromEntries(formData)
    const validate = PlantSchema.safeParse(entries)
    if (validate.success) {
        const request = await fetch(`http://localhost:3000/api/v1/employees/${session?.user?.id}/plants`, {
            method: "POST",
            body: JSON.stringify(validate.data),
        })
        const result = await request.json()
        if (request.ok) {
            if(!result.ok){
                return {
                    message: result.message ,
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
    const errors = validate?.error?.flatten().fieldErrors
    const schema = Object.keys(errors)
        .filter((key) => errors[key as keyof typeof errors])
        .reduce((prev, now) => ({ ...prev, [now]: errors[now as keyof typeof errors]?.at(0) }), {})
    return {
        message: "Check the invalid fields",
        isSuccess: false,
        schema: schema as Plants,
    }
}
