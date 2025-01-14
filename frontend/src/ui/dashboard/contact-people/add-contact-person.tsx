"use client"
import { useEffect, useState, useActionState } from "react"
import { Project, Role } from "@/lib/@types/models"
import { addContactPersonAction } from "@/lib/actions"
import { AddContactPersonActionState, Entry } from "@/lib/@types/types"
import { getProjectsByStakeHolderId, getRoles } from "@/lib/services"
import { Form, InputList, Label, Select, Submit, merge } from "@/ui/common/form/index"
import { ClassNameProps } from "@/lib/@types/props"
import { getSessionToken } from "@/lib/utils"
import dataJson from "@/lib/data.json"

const { contactPersonInputs } = dataJson

export const AddContactPerson = ({ className }: ClassNameProps) => {
    const [roles, setRoles] = useState<Role[]>([])
    const [projects, setProjects] = useState<Project[]>([])
    const [state, formAction] = useActionState(addContactPersonAction, {
        message: "",
        isSuccess: false,
        schema: {} as AddContactPersonActionState["schema"],
    })

    const mapRoles = roles.map<Entry>(({ idRole, name }) => ({ key: name, value: idRole }))
    const mapProjects = projects.map<Entry>(({ idProject, designation }) => ({ key: designation, value: idProject }))

    useEffect(() => {
        const fetchProjects = async () => {
            const { idStakeHolder } = await getSessionToken()
            const response = await getProjectsByStakeHolderId(idStakeHolder)
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
        <Form className={merge("w-full min-h-main pt-4", className)} action={formAction}>
            <InputList inputs={contactPersonInputs} state={state} />
            <Label className="w-full text-neutral-700" size="sm">
                Role
                <Select name="idRole" values={mapRoles} />
            </Label>
            <Label className="w-full text-neutral-700" size="sm">
                Project
                <Select name="project" values={mapProjects} />
            </Label>
            <Submit className="mt-6" fullWidth>
                Add
            </Submit>
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
