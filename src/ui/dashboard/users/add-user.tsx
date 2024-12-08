"use client"
import { useEffect, useState, useActionState } from "react"
import { useSession } from "next-auth/react"
import { Project, Role } from "@prisma/client"
import { addUserAction } from "@/lib/actions"
import { AddUserActionState } from "@/lib/@types/types"
import { getProjectsByStakeHolderId, getRoles, getContactPersonById } from "@/lib/services"
import { Button, Form, InputList, Label, SelectGeneric } from "@/ui/common/form-elements"
import dataJson from "@/lib/data.json"

const { userInputs } = dataJson

export const AddUser = () => {
    const { data: session } = useSession()
    const [roles, setRoles] = useState<Role[]>([])
    const [projects, setProjects] = useState<Project[]>([])
    const [state, formAction] = useActionState(addUserAction, {
        message: "",
        isSuccess: false,
        schema: {} as AddUserActionState["schema"],
    })

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
                <SelectGeneric values={roles} id="name" value="idRole" name="idRole" />
            </Label>
            <Label className="w-full text-neutral-700" size="sm">
                Project
                <SelectGeneric values={projects} id="designation" value="idProject" name="project" />
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
