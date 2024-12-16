"use client"
import { useEffect, useState, useActionState } from "react"
import { Project } from "@prisma/client"
import { addFieldsAction } from "@/lib/actions"
import { AddFieldsActionState } from "@/lib/@types/types"
import { getProjectsByStakeHolderId } from "@/lib/services"
import { Submit, Form, Input, InputList, Label, SelectGeneric } from "@/ui/common/form-elements"
import { getSessionToken, merge } from "@/lib/utils"
import { ClassNameProps } from "@/lib/@types/props"
import dataJson from "@/lib/data.json"

const { addressInputs } = dataJson

export const AddField = ({ className }: ClassNameProps) => {
    const [projects, setProjects] = useState<Project[]>([])
    const [state, formAction] = useActionState(addFieldsAction, {
        message: "",
        isSuccess: false,
    } as AddFieldsActionState)

    useEffect(() => {
        const fetchProjects = async () => {
            const { idStakeHolder } = await getSessionToken()
            const response = await getProjectsByStakeHolderId(idStakeHolder)
            setProjects(response)
        }
        fetchProjects()
    }, [])

    return (
        <Form className={merge("w-full min-h-main pt-4", className)} action={formAction}>
            <h1 className="text-2xl font-bold text-center">Add Fields</h1>
            <Label className="w-full text-neutral-700" size="sm">
                Designation
                <Input className="mt-1 focus-within:border-black focus-within:ring-black" name="designation" variant="outline" />
            </Label>
            <Label className="w-full flex items-center gap-x-2 text-neutral-700" size="sm">
                Fence
                <Input className="size-4" type="checkbox" name="fence" />
            </Label>
            <Label className="w-full flex items-center gap-x-2 text-neutral-700" size="sm">
                Connection Earthing Fence
                <Input className="size-4" type="checkbox" name="connectionEarthingFence" />
            </Label>
            <Label className="w-full flex items-center gap-x-2 text-neutral-700" size="sm">
                External Current Influence
                <Input className="size-4" type="checkbox" name="externalCurrentInfluence" />
            </Label>
            <Label className="w-full text-neutral-700" size="sm">
                Project
                <SelectGeneric values={projects} id="designation" value="idProject" name="project" />
            </Label>
            <InputList inputs={addressInputs} state={state} />
            <Submit className="mt-6" fullWidth>
                Add
            </Submit>
            {state.message && (
                <div
                    className={merge("mt-4 p-2 text-green-700 rounded", {
                        "text-red-700 bg-red-100": !state.isSuccess,
                    })}
                >
                    {state.message}
                </div>
            )}
        </Form>
    )
}
