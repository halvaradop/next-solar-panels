"use client"
import { useEffect, useState, useActionState } from "react"
import { useSession } from "next-auth/react"
import { Project } from "@prisma/client"
import { addFieldsAction } from "@/lib/actions"
import { AddFieldsActionState } from "@/lib/@types/types"
import { getProjectsByStakeHolderId, getContactPersonById } from "@/lib/services"
import { Button, Form, Input, InputList, Label, SelectGeneric } from "@/ui/common/form-elements"
import { merge } from "@/lib/utils"
import dataJson from "@/lib/data.json"

const { addressInputs } = dataJson

export const AddField = () => {
    const { data: session } = useSession()
    const [projects, setProjects] = useState<Project[]>([])
    const [state, formAction] = useActionState(addFieldsAction, {
        message: "",
        isSuccess: false,
    } as AddFieldsActionState)

    useEffect(() => {
        const fetchProjects = async () => {
            const userId = session?.user?.id ? session.user.id : Number.MAX_SAFE_INTEGER.toString()

            const {
                stakeHolder: [{ idStakeHolder } = { idStakeHolder: "" }],
            } = await getContactPersonById(userId)
            const response = await getProjectsByStakeHolderId(idStakeHolder)
            setProjects(response)
        }
        fetchProjects()
    }, [])

    return (
        <Form className="w-full min-h-main pt-4" action={formAction}>
            <h1 className="text-2xl font-bold text-center">Add Fields</h1>
            <Label className="w-full text-neutral-700" size="sm">
                Designation
                <Input className="mt-1 focus-within:border-black focus-within:ring-black" name="designation" variant="outline" />
            </Label>
            <Label className="w-full text-neutral-700" size="sm">
                Fence
                <Input className="size-4" type="checkbox" name="fence" />
            </Label>
            <Label className="w-full text-neutral-700" size="sm">
                Connection Earthing Fence
                <Input className="size-4" type="checkbox" name="connectionEarthingFence" />
            </Label>
            <Label className="w-full text-neutral-700" size="sm">
                External Current Influence
                <Input className="size-4" type="checkbox" name="externalCurrentInfluence" />
            </Label>
            <Label className="w-full text-neutral-700" size="sm">
                Project
                <SelectGeneric values={projects} id="designation" value="idProject" name="project" />
            </Label>
            <InputList inputs={addressInputs} state={state} />
            <Button className="mt-6" fullWidth>
                Add
            </Button>
            {state.message && (
                <div
                    className={merge("mt-4 p-2 text-green-700 rounded bg-green-100 ", {
                        "text-red-700 bg-red-100": !state.isSuccess,
                    })}
                >
                    {state.message}
                </div>
            )}
        </Form>
    )
}
