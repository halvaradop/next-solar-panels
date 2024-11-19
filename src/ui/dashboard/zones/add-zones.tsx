"use client"
import { useFormState } from "react-dom"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { Project } from "@prisma/client"
import { addZonesAction } from "@/lib/actions"
import { AddZonesActionState } from "@/lib/@types/types"
import { getProjectsByClientId, getUserById } from "@/lib/services"
import { Button, Form, InputList, Label, SelectGeneric } from "@/ui/common/form"
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
        const fetchPlants = async () => {
            const userId = session?.user?.id ? Number(session.user.id) : Number.MAX_SAFE_INTEGER
            const { clientId } = await getUserById(userId)
            const response = await getProjectsByClientId(clientId)
            setProjects(response)
        }
        fetchPlants()
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
        </Form>
    )
}
