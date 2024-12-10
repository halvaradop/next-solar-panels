"use client"
import { useEffect, useState, useActionState } from "react"
import { useSession } from "next-auth/react"
import { Project } from "@prisma/client"
import { addFieldsAction } from "@/lib/actions"
import { AddFieldsActionState } from "@/lib/@types/types"
import { getProjectsByStakeHolderId, getContactPersonById } from "@/lib/services"
import { Button, Form, InputList, Label, SelectGeneric } from "@/ui/common/form-elements"
import { merge } from "@/lib/utils"
import dataJson from "@/lib/data.json"
import { AddFieldsProps } from "@/lib/@types/props"

const { fieldInputs } = dataJson

export const AddField = ({ className }: AddFieldsProps) => {
    const { data: session } = useSession()
    const [projects, setProjects] = useState<Project[]>([])
    const [state, formAction] = useActionState(addFieldsAction, {
        message: "",
        isSuccess: false,
    } as AddFieldsActionState)

    useEffect(() => {
        const fetchProjects = async () => {
            const userId = session?.user?.id ? session.user.id : Number.MAX_SAFE_INTEGER.toString()
            /*TODO : fix stakeholderid
            const {
                stakeHolders: [{ stakeHolderId } = { stakeHolderId: "" }],
            } = await getContactPersonById(userId)*/
            const response = await getProjectsByStakeHolderId("stakeHolderId")
            setProjects(response)
        }
        fetchProjects()
    }, [])
    return (
        <Form className={merge("w-full min-h-main pt-4", className)} action={formAction}>
            <InputList inputs={fieldInputs} state={state} />
            <Label className="w-full text-neutral-700" size="sm">
                Plant
                <SelectGeneric values={projects} id="designation" value="idProject" name="project" />
            </Label>
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
