"use client"
import { useEffect, useState, useActionState } from "react"
import { useSession } from "next-auth/react"
import { Project, Role } from "@prisma/client"
import { addContactPersonAction } from "@/lib/actions"
import { AddContactPersonActionState } from "@/lib/@types/types"
import { getProjectsByStakeHolderId, getRoles, getContactPersonById } from "@/lib/services"
import { Button, Form, InputList, Label, SelectGeneric } from "@/ui/common/form-elements"
import dataJson from "@/lib/data.json"

const { contactPersonInputs } = dataJson

export const AddContactPerson = () => {
    const { data: session } = useSession()
    const [roles, setRoles] = useState<Role[]>([])
    const [projects, setProjects] = useState<Project[]>([])
    const [state, formAction] = useActionState(addContactPersonAction, {
        message: "",
        isSuccess: false,
        schema: {} as AddContactPersonActionState["schema"],
    })

    useEffect(() => {
        const fetchProjects = async () => {
            const userId = session?.user?.id ? session.user.id : Number.MAX_SAFE_INTEGER.toString()
            /* TODO : fix stakeholderid
           const {
                stakeHolders: [{ stakeHolderId } = { stakeHolderId: "" }],
            } = await getContactPersonById(userId)*/
            const response = await getProjectsByStakeHolderId("stakeHolderId")
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
            <InputList inputs={contactPersonInputs} state={state} />
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
