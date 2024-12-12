"use client"

import { useEffect, useState, useActionState } from "react"
import { useSession } from "next-auth/react"
import { ContactPerson, Field } from "@prisma/client"
import { addPositionDataAction, addProjectAction } from "@/lib/actions"
import { AddPositionDataActionState, AddPositionSoilDatasPageActionState, AddProjectActionState } from "@/lib/@types/types"
import { getContactPersonById, getContactPersonByStakeHolderId, getFieldsByStakeHolderId } from "@/lib/services"
import { Button, Form, Input, InputList, Label, SelectGeneric } from "@/ui/common/form-elements"
import dataJson from "@/lib/data.json"
import { AddPositionDataProps } from "@/lib/@types/props"
import { merge } from "@halvaradop/ui-core"

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
        /**
         * TODO: fix bug
         */
        const fetchContactPerson = async () => {
            const userId = session?.user?.id ? session.user.id : Number.MAX_SAFE_INTEGER.toString()

            const {
                stakeHolder: [{ idStakeHolder } = { idStakeHolder: "" }],
            } = await getContactPersonById(userId)
            const response = await getFieldsByStakeHolderId(idStakeHolder)
            setFields(response)
            setIdStakeHolder(idStakeHolder)
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
