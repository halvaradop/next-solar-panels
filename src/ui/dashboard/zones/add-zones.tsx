"use client"
import { useEffect, useState, useActionState } from "react"
import { useSession } from "next-auth/react"
import { Project } from "@prisma/client"
import { addZonesAction } from "@/lib/actions"
import { AddZonesActionState } from "@/lib/@types/types"
import { getProjectsByStakeHolderId, getContactPersonById } from "@/lib/services"
import { Button, Form, InputList, Label, SelectGeneric } from "@/ui/common/form-elements"
import { merge } from "@/lib/utils"
import dataJson from "@/lib/data.json"

const { zoneInputs } = dataJson

export const AddZone = () => {
    const { data: session } = useSession()
    const [projects, setProjects] = useState<Project[]>([])
    const [state, formAction] = useActionState(addZonesAction, {
        message: "",
        isSuccess: false,
    } as AddZonesActionState)

    useEffect(() => {
        const fetchProjects = async () => {
            const userId = session?.user?.id ? session.user.id : Number.MAX_SAFE_INTEGER.toString()
            const {
                stakeHolders: [{ stakeHolderId } = { stakeHolderId: "" }],
            } = await getContactPersonById(userId)
            const response = await getProjectsByStakeHolderId(stakeHolderId)
            setProjects(response)
        }
        fetchProjects()
    }, [])
    return (
        <Form className="w-full min-h-main pt-4" action={formAction}>
            <InputList inputs={zoneInputs} state={state} />
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
