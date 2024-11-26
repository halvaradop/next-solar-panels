"use client"
import { useFormState } from "react-dom"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { Project } from "@prisma/client"
import { addZonesAction } from "@/lib/actions"
import { AddZonesActionState } from "@/lib/@types/types"
import { getProjectsByClientId, getUserById } from "@/lib/services"
import { Button, Form, InputList, Label, SelectGeneric } from "@/ui/common/form-elements"
import { merge } from "@/lib/utils"
import dataJson from "@/lib/data.json"

const { zoneInputs } = dataJson

export const AddZone = () => {
    const { data: session } = useSession()
    const [projects, setProjects] = useState<Project[]>([])
    const [state, formAction] = useFormState(addZonesAction, {
        message: "",
        isSuccess: false,
    } as AddZonesActionState)

    useEffect(() => {
        const fetchProjects = async () => {
            const userId = session?.user?.id ? session.user.id : Number.MAX_SAFE_INTEGER.toString()
            const {
                clients: [{ clientId } = { clientId: "" }],
            } = await getUserById(userId)
            const response = await getProjectsByClientId(clientId)
            setProjects(response)
        }
        fetchProjects()
    }, [])
    return (
        <Form className="w-full min-h-main pt-4" action={formAction}>
            <InputList inputs={zoneInputs} state={state} />
            <Label className="w-full text-neutral-700" size="sm">
                Plant
                <SelectGeneric values={projects} id="name" value="projectId" name="project" />
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
