"use client"
import { useActionState } from "react"
import { useEffect, useState } from "react"
import { addStakeHolderAction } from "@/lib/actions"
import { AddStakeHolderActionState } from "@/lib/@types/types"
import { Form, InputList, Label, SelectGeneric, Submit } from "@/ui/common/form-elements"
import { getContactPersonByStakeHolderId } from "@/lib/services"
import { ContactPerson } from "@prisma/client"
import { ClassNameProps } from "@/lib/@types/props"
import { merge } from "@halvaradop/ui-core"
import dataJson from "@/lib/data.json"
import { getSessionToken } from "@/lib/utils"

const { stakeHolderInputs } = dataJson

const type = [
    { id: "CLIENT", name: "CLIENT" },
    { id: "SUPPLIER", name: "SUPPLIER" },
    { id: "SERVICE_PROVIDER", name: "SERVICE_PROVIDER" },
    { id: "GOVT_INSTANCE", name: "GOVT_INSTANCE" },
]

export const AddStakeHolder = ({ className }: ClassNameProps) => {
    const [contactPerson, setContacPerson] = useState<ContactPerson[]>([])
    const [state, formAction] = useActionState(addStakeHolderAction, {
        message: "",
        isSuccess: false,
        schema: {} as AddStakeHolderActionState["schema"],
    })

    useEffect(() => {
        const fetchContactPerson = async () => {
            const { idStakeHolder } = await getSessionToken()
            const response = await getContactPersonByStakeHolderId(idStakeHolder)
            setContacPerson(response)
        }
        fetchContactPerson()
    }, [])

    return (
        <Form className={merge("w-full min-h-main pt-4", className)} action={formAction}>
            <InputList inputs={stakeHolderInputs} state={state} />
            <Label className="w-full text-neutral-700" size="sm">
                Contact Person
                <SelectGeneric values={contactPerson} id="lastName" value="idContactPerson" name="contactPerson" />
            </Label>
            <Label className="w-full text-neutral-700" size="sm">
                Types
                <SelectGeneric values={type} id="id" value="name" name="type" />
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
