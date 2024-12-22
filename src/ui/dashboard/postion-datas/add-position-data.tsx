"use client"
import { useEffect, useState, useActionState } from "react"
import { Field } from "@prisma/client"
import { addPositionDataAction } from "@/lib/actions"
import { AddPositionDataActionState, Entry } from "@/lib/@types/types"
import { getFieldsByStakeHolderId } from "@/lib/services"
import { Form, Input, InputList, Label, Select, Submit, merge } from "@/ui/common/form/index"
import { ClassNameProps } from "@/lib/@types/props"
import { getSessionToken } from "@/lib/utils"
import dataJson from "@/lib/data.json"

const { positionDatas } = dataJson

const types: Entry[] = [
    { key: "POI", value: "POI" },
    { key: "FIELD", value: "FIELD" },
    { key: "ZONE", value: "ZONE" },
    { key: "MEASUREMENT", value: "MEASUREMENT" },
]

export const AddPositionData = ({ className }: ClassNameProps) => {
    const [fields, setFields] = useState<Field[]>([])
    const [idStakeHolder, setIdStakeHolder] = useState<string>("")
    const [state, formAction] = useActionState(addPositionDataAction, {
        message: "",
        isSuccess: false,
        schema: {} as AddPositionDataActionState["schema"],
    })

    useEffect(() => {
        const fetchContactPerson = async () => {
            const { idStakeHolder } = await getSessionToken()
            const response = await getFieldsByStakeHolderId(idStakeHolder)
            setFields(response)
            setIdStakeHolder(idStakeHolder)
        }
        fetchContactPerson()
    }, [])

    const mapFields = fields.map(({ idField, designation }) => ({ key: designation, value: idField }))

    return (
        <Form className={merge("w-full min-h-main pt-4", className)} action={formAction}>
            <InputList inputs={positionDatas} state={state} />
            <Label className="w-full text-neutral-700" size="sm">
                Position Data
                <Select name="field" values={mapFields} />
            </Label>
            <Label className="w-full text-neutral-700" size="sm">
                Types
                <Select name="pointType" values={types} />
            </Label>
            <Label className="w-full flex items-center gap-x-2 text-neutral-700" size="sm">
                Grounding
                <Input className="size-4" type="checkbox" name="grounding" />
            </Label>
            <input type="hidden" name="idStakeholder" value={idStakeHolder} />
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
