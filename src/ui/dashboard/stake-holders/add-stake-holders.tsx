"use client"
import { useActionState } from "react"
import { useEffect, useState } from "react"
import { addStakeHolderAction } from "@/lib/actions"
import { AddStakeHolderActionState } from "@/lib/@types/types"
import { Button, Form, InputList, Label, SelectGeneric } from "@/ui/common/form-elements"
import { getContactPersonByStakeHolderId } from "@/lib/services"
import { ContactPerson } from "@prisma/client"
import { AddStakeHoldersProps } from "@/lib/@types/props"
import { merge } from "@halvaradop/ui-core"
import { getCookieToken } from "@/lib/services/cookies"
import dataJson from "@/lib/data.json"
import { redirect } from "next/navigation"

const { stakeHolderInputs } = dataJson

export const AddStakeHolder = ({ className }: AddStakeHoldersProps) => {
    const [contactPerson, setContacPerson] = useState<ContactPerson[]>([])
    const [state, formAction] = useActionState(addStakeHolderAction, {
        message: "",
        isSuccess: false,
        schema: {} as AddStakeHolderActionState["schema"],
    })

    useEffect(() => {
        const fetchContactPerson = async () => {
            const {
                ok,
                data: { idStakeholder },
            } = await getCookieToken()
            if (!ok) {
                return redirect("/dashboard?error=You need to select a stakeholder first")
            }
            const response = await getContactPersonByStakeHolderId(idStakeholder)
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
