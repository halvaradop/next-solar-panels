"use client"
import { useEffect, useState, useActionState } from "react"
import { ContactPerson } from "@prisma/client"
import { addProjectAction } from "@/lib/actions"
import { AddProjectActionState } from "@/lib/@types/types"
import { getContactPersonByStakeHolderId } from "@/lib/services"
import { Form, InputList, Label, SelectGeneric, Submit } from "@/ui/common/form-elements"
import { ClassNameProps } from "@/lib/@types/props"
import { merge } from "@halvaradop/ui-core"
import { getSessionToken } from "@/lib/utils"
import dataJson from "@/lib/data.json"
import { AddLayoutProject } from "./add-layout-project"

const { projectInputs, addressInputs } = dataJson

export const AddProject = ({ className }: ClassNameProps) => {
    const [contactPersons, setContactPerson] = useState<ContactPerson[]>([])
    const [idStakeHolder, setIdStakeHolder] = useState<string>("")
    const [state, formAction] = useActionState(addProjectAction, {
        message: "",
        isSuccess: false,
        schema: {} as AddProjectActionState["schema"],
    })

    useEffect(() => {
        const fetchProjects = async () => {
            const { idStakeHolder } = await getSessionToken()
            const response = await getContactPersonByStakeHolderId(idStakeHolder)
            setContactPerson(response)
            setIdStakeHolder(idStakeHolder)
        }
        fetchProjects()
    }, [])

    return (
        <Form className={merge("w-full min-h-main pt-4", className)} action={formAction}>
            <InputList inputs={projectInputs} state={state} />
            <Label className="w-full text-neutral-700" size="sm">
                Contact Person
                <SelectGeneric values={contactPersons} id="lastName" value="idContactPerson" name="contactPerson" />
            </Label>
            <InputList inputs={addressInputs} state={state} />
            <input type="hidden" name="idStakeholder" defaultValue={idStakeHolder} />
            <Submit className="mt-6" fullWidth>
                Add
            </Submit>
            <AddLayoutProject />
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
