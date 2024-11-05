"use server"
import { redirect } from "next/navigation"
import { AuthError } from "next-auth"
import { signIn } from "@/auth"
import { scheduler } from "timers/promises"
import { AddSampleActionState, LoginActionState } from "@/lib/@types/types"

/**
 * Adds a sample to the database and checks if the action was successful
 *
 * @param previous state of the sample to be added
 * @param formData form data sent by the user
 * @returns state of the sample and the result of the action
 */
export const addSampleAction = async (previous: AddSampleActionState, formData: FormData): Promise<AddSampleActionState> => {
    await scheduler.wait(2000)
    console.log("formData", formData, ", previous", previous)
    return { message: "", isSuccess: true } as AddSampleActionState
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
    return { message: "Authorized", isSuccess: true } as LoginActionState
}
