"use client"
import { useEffect, useState } from "react"
import { useFormState } from "react-dom"
import { useSession } from "next-auth/react"
import { Project, Role } from "@prisma/client"
import { addUserAction } from "@/lib/actions"
import { AddUserActionState } from "@/lib/@types/types"
import { getProjectsByClientId, getRoles, getUserById } from "@/lib/services"
import { Button, Form, InputList, Label, SelectGeneric } from "@/ui/common/form"
import dataJson from "@/lib/data.json"

const { userInputs } = dataJson

export const AddUser = () => {
    const { data: session } = useSession()
    const [roles, setRoles] = useState<Role[]>([])
    const [projects, setProjects] = useState<Project[]>([])
    const [state, formAction] = useFormState(addUserAction, {
        message: "",
        isSuccess: false,
        schema: {} as AddUserActionState["schema"],
    })

    useEffect(() => {
        const fetchPlants = async () => {
            const userId = session?.user?.id ? session.user.id : Number.MAX_SAFE_INTEGER.toString()
            const {
                clients: [{ clientId }],
            } = await getUserById(userId)
            const response = await getProjectsByClientId(clientId)
            setProjects(response)
        }
        fetchPlants()
    }, [])

    useEffect(() => {
        const fetchRoles = async () => {
            const response = await getRoles()
            setRoles(response)
        }
        fetchRoles()
    }, [])

    return (
        <Form className="w-full min-h-main pt-4" action={formAction}>
            <InputList inputs={userInputs} state={state} />
            <Label className="w-full text-neutral-700" size="sm">
                Role
                <SelectGeneric values={roles} id="roleName" value="roleId" name="roleId" />
            </Label>
            <Label className="w-full text-neutral-700" size="sm">
                Project
                <SelectGeneric values={projects} id="name" value="projectId" name="project" />
            </Label>
            <Button className="mt-6" fullWidth>
                Add
            </Button>
            {state.message && (
                <div
                    className={`mt-4 p-2 rounded ${state.isSuccess ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                >
                    {state.message}
                </div>
            )}
        </Form>
    )
}
