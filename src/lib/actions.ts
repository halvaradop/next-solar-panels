"use server"
import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import { AuthError } from "next-auth"
import { signIn } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { SampleSchema } from "./schemas"
import { AddSampleActionState, LoginActionState } from "@/lib/@types/types"

/**
 * Adds a sample to the database and checks if the action was successful
 *
 * @param previous state of the sample to be added
 * @param formData form data sent by the user
 * @returns state of the sample and the result of the action
 */
export const addSampleAction = async (previous: AddSampleActionState, formData: FormData): Promise<AddSampleActionState> => {
    const entries = Object.fromEntries(formData)
    const validate = SampleSchema.safeParse(entries)
    if (validate.success) {
        await prisma.sample.create({
            data: {
                corrosion: validate.data.corrosion,
                humidity: parseInt(validate.data.humidity),
                material: validate.data.material,
                temperature: parseInt(validate.data.temperature),
                Zone: {
                    connect: {
                        id: parseInt(validate.data.zone),
                    },
                },
            },
        })
        revalidateTag("samplesByUser")
        redirect("/dashboard")
    }
    const errors = validate.error.flatten().fieldErrors
    return {
        message: "Check the invalid fields",
        isSuccess: false,
        schema: {
            material: errors.material?.slice(0, 1),
        },
    } as never as AddSampleActionState
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
