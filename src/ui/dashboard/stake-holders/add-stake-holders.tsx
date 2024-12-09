"use client"
import { useActionState } from "react"
import { addStakeHolderAction } from "@/lib/actions"
import { AddStakeHolderActionState } from "@/lib/@types/types"
import { Button, Form, InputList, Label, SelectGeneric } from "@/ui/common/form-elements"
import dataJson from "@/lib/data.json"
import { useEffect, useState } from "react"
import { getContactPersonById, getContactPersonByStakeHolderId } from "@/lib/services"
import { useSession } from "next-auth/react"
import { ContactPerson } from "@prisma/client"

const { stakeHolderInputs } = dataJson

export const AddStakeHolder = () => {
    const { data: session } = useSession()
    const [contactPerson, setContacPerson] = useState<ContactPerson[]>([])
    const [state, formAction] = useActionState(addStakeHolderAction, {
        message: "",
        isSuccess: false,
        schema: {} as AddStakeHolderActionState["schema"],
    })

    useEffect(() => {
        const fetchContactPerson = async () => {
            const userId = session?.user?.id ? session.user.id : Number.MAX_SAFE_INTEGER.toString()
            const {
                stakeHolder: [{ idStakeHolder } = { idStakeHolder: "" }],
            } = await getContactPersonById(userId)
            const response = await getContactPersonByStakeHolderId(idStakeHolder)
            setContacPerson(response)
        }
        fetchContactPerson()
    }, [])

    return (
        <Form className="w-full min-h-main pt-4" action={formAction}>
            <InputList inputs={stakeHolderInputs} state={state} />
            <Label className="w-full text-neutral-700" size="sm">
                Contact Person
                <SelectGeneric values={contactPerson} id="lastName" value="idContactPerson" name="contactPerson" />
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
