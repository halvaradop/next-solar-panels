"use client"
import { useActionState } from "react"
import { useEffect, useState } from "react"
import { addStakeHolderAction } from "@/lib/actions"
import { AddStakeHolderActionState, Entry } from "@/lib/@types/types"
import { Form, InputList, Label, Select, Submit } from "@/ui/common/form/index"
import { getContactPersonByStakeHolderId } from "@/lib/services"
import { ContactPerson } from "@prisma/client"
import { ClassNameProps } from "@/lib/@types/props"
import { merge } from "@halvaradop/ui-core"
import { getSessionToken } from "@/lib/utils"
import dataJson from "@/lib/data.json"

const { stakeHolderInputs } = dataJson

const type: Entry[] = [
    { key: "CLIENT", value: "CLIENT" },
    { key: "SUPPLIER", value: "SUPPLIER" },
    { key: "SERVICE_PROVIDER", value: "SERVICE_PROVIDER" },
    { key: "GOVT_INSTANCE", value: "GOVT_INSTANCE" },
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

    const mapContactPeople = contactPerson.map(({ idContactPerson, lastName }) => ({ key: lastName, value: idContactPerson }))

    return (
        <Form className={merge("w-full min-h-main pt-4", className)} action={formAction}>
            <InputList inputs={stakeHolderInputs} state={state} />
            <Label className="w-full text-neutral-700" size="sm">
                Contact Person
                <Select name="contactPerson" values={mapContactPeople} />
            </Label>
            <Label className="w-full text-neutral-700" size="sm">
                Types
                <Select name="type" values={type} />
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
