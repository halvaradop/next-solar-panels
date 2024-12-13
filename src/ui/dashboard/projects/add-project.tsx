"use client"
import { useEffect, useState, useActionState } from "react"
import { redirect } from "next/navigation"
import { ContactPerson } from "@prisma/client"
import { addProjectAction } from "@/lib/actions"
import { AddProjectActionState } from "@/lib/@types/types"
import { getContactPersonByStakeHolderId } from "@/lib/services"
import { Button, Form, InputList, Label, SelectGeneric } from "@/ui/common/form-elements"
import { AddProjectProps } from "@/lib/@types/props"
import { merge } from "@halvaradop/ui-core"
import { getCookieToken } from "@/lib/services/cookies"
import dataJson from "@/lib/data.json"

const { projectInputs, addressInputs } = dataJson

export const AddProject = ({ className }: AddProjectProps) => {
    const [contactPersons, setContactPerson] = useState<ContactPerson[]>([])
    const [idStakeHolder, setIdStakeHolder] = useState<string>("")
    const [state, formAction] = useActionState(addProjectAction, {
        message: "",
        isSuccess: false,
        schema: {} as AddProjectActionState["schema"],
    })

    useEffect(() => {
        const fetchProjects = async () => {
            const {
                ok,
                data: { idStakeholder },
            } = await getCookieToken()
            if (!ok) {
                return redirect("/dashboard?error=You need to select a stakeholder first")
            }

            const response = await getContactPersonByStakeHolderId(idStakeholder)
            setIdStakeHolder(idStakeholder)
            setContactPerson(response)
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
            <input type="hidden" name="idStakeholder" value={idStakeHolder} />
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
