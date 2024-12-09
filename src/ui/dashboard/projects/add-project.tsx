"use client"

import { useEffect, useState, useActionState } from "react"
import { useSession } from "next-auth/react"
import { ContactPerson, StakeHolder } from "@prisma/client"
import { addProjectAction } from "@/lib/actions"
import { AddProjectActionState } from "@/lib/@types/types"
import { getContactPersonById, getContactPersonByStakeHolderId, getStakeHolder } from "@/lib/services"
import { Button, Form, InputList, Label, SelectGeneric } from "@/ui/common/form-elements"
import dataJson from "@/lib/data.json"

const { projectInputs } = dataJson
export const fetchCache = "force-no-store"

export const AddProject = () => {
    const { data: session } = useSession()
    const [contactPersons, setcontactPerson] = useState<ContactPerson[]>([])
    const [stakeHolders, setstakeHolders] = useState<StakeHolder[]>([])
    const [state, formAction] = useActionState(addProjectAction, {
        message: "",
        isSuccess: false,
        schema: {} as AddProjectActionState["schema"],
    })

    useEffect(() => {
        /**
         * TODO: fix bug
         */
        const fetchContactPerson = async () => {
            const userId = session?.user?.id ? session.user.id : Number.MAX_SAFE_INTEGER.toString()

            const {
                stakeHolder: [{ idStakeHolder } = { idStakeHolder: "" }],
            } = await getContactPersonById(userId)
            const [conctacPersons, stakeHolders] = await Promise.all([
                getContactPersonByStakeHolderId(idStakeHolder),
                getStakeHolder(),
            ])
            setcontactPerson(conctacPersons)
            setstakeHolders(stakeHolders)
        }
        fetchContactPerson()
    }, [])

    return (
        <Form className="w-full min-h-main pt-4" action={formAction}>
            <InputList inputs={projectInputs} state={state} />
            <Label className="w-full text-neutral-700" size="sm">
                Contact Person
                <SelectGeneric values={contactPersons} id="lastName" value="idContactPerson" name="user" />
            </Label>
            <Label className="w-full text-neutral-700" size="sm">
                Contact Person
                <SelectGeneric values={stakeHolders} id="name" value="idStakeHolder" name="user" />
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
