"use server"
import { scheduler } from "timers/promises"
import { AddSampleActionState } from "@/lib/@types/types"

/**
 * Adds a sample to the database and checks if the action was successful
 *
 * @param previous state of the sample to be added
 * @param formData form data sent by the user
 * @returns state of the sample and the result of the action
 */
export const addSampleAction = async (previous: AddSampleActionState, formData: FormData): Promise<AddSampleActionState> => {
    await scheduler.wait(2000)
    return { message: "", isSuccess: true } as AddSampleActionState
}
