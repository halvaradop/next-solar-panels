"use client"
import { useEffect, useState, useActionState } from "react"
import { redirect } from "next/navigation"
import { Project, Role } from "@prisma/client"
import { addContactPersonAction } from "@/lib/actions"
import { AddContactPersonActionState } from "@/lib/@types/types"
import { getProjectsByStakeHolderId, getRoles } from "@/lib/services"
import { Form, InputList, Label, SelectGeneric, Submit } from "@/ui/common/form-elements"
import { ClassNameProps } from "@/lib/@types/props"
import { merge } from "@halvaradop/ui-core"
import { getCookieToken } from "@/lib/services/cookies"
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

    useEffect(() => {
        const fetchProjects = async () => {
            const { ok, data } = await getCookieToken()
            if (!ok) {
                return redirect("/dashboard?error=You need to select a stakeholder first")
            }
            const response = await getProjectsByStakeHolderId(data.idStakeHolder)
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
                <SelectGeneric values={roles} id="name" value="idRole" name="idRole" />
            </Label>
            <Label className="w-full text-neutral-700" size="sm">
                Project
                <SelectGeneric values={projects} id="designation" value="idProject" name="project" />
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
