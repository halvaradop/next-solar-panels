"use client"
import { useEffect, useState, useActionState } from "react"
import { useSession } from "next-auth/react"
import { Field } from "@prisma/client"
import { addPositionDataAction } from "@/lib/actions"
import { AddPositionDataActionState } from "@/lib/@types/types"
import { getFieldsByStakeHolderId } from "@/lib/services"
import { Button, Form, Input, InputList, Label, SelectGeneric } from "@/ui/common/form-elements"
import dataJson from "@/lib/data.json"
import { AddPositionDataProps } from "@/lib/@types/props"
import { merge } from "@halvaradop/ui-core"
import { getCookieToken } from "@/lib/services/cookies"
import { redirect } from "next/navigation"

const { positionDatas } = dataJson
const types = [
    { id: "POI", name: "POI" },
    { id: "FIELD", name: "FIELD" },
    { id: "ZONE", name: "ZONE" },
    { id: "MEASUREMENT", name: "MEASUREMENT" },
]

export const AddPositionData = ({ className }: AddPositionDataProps) => {
    const { data: session } = useSession()
    const [fields, setFields] = useState<Field[]>([])
    const [idStakeHolder, setIdStakeHolder] = useState<string>("")
    const [state, formAction] = useActionState(addPositionDataAction, {
        message: "",
        isSuccess: false,
        schema: {} as AddPositionDataActionState["schema"],
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
            const response = await getFieldsByStakeHolderId(idStakeholder)
            setIdStakeHolder(idStakeholder)
            setFields(response)
        }
        fetchContactPerson()
    }, [])

    return (
        <Form className={merge("w-full min-h-main pt-4", className)} action={formAction}>
            <InputList inputs={positionDatas} state={state} />
            <Label className="w-full text-neutral-700" size="sm">
                Position Data
                <SelectGeneric values={fields} id="idField" value="idField" name="field" />
            </Label>
            <Label className="w-full text-neutral-700" size="sm">
                Types
                <SelectGeneric values={types} id="id" value="name" name="pointType" />
            </Label>
            <Label className="w-full flex items-center gap-x-2 text-neutral-700" size="sm">
                Grounding
                <Input className="size-4" type="checkbox" name="grounding" />
            </Label>
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
