"use client"
import { useEffect, useState, useActionState } from "react"
import { useSession } from "next-auth/react"
import { Field } from "@prisma/client"
import { addPositionSoilDatasPageAction } from "@/lib/actions"
import { AddPositionSoilDatasPageActionState, PositionSoilDatasWithoutIds } from "@/lib/@types/types"
import { getFieldsByStakeHolderId, getContactPersonById } from "@/lib/services"
import { Form, Input, Label, SelectGeneric, Select } from "@/ui/common/form-elements"
import { Submit } from "@/ui/common/submit"
import dataJson from "@/lib/data.json"

const { sampleInputs } = dataJson

export const AddPositionSoilDatas = () => {
    const { data: session } = useSession()
    const [fields, setfields] = useState<Field[]>([])
    const [state, formAction] = useActionState(addPositionSoilDatasPageAction, {
        message: "",
        isSuccess: false,
        schema: {} as AddPositionSoilDatasPageActionState["schema"],
    })

    useEffect(() => {
        const fetchFields = async () => {
            const userId = session?.user?.id || Number.MAX_SAFE_INTEGER.toString()
            /* TODO : fix stakeholderid
           const {
                stakeHolders: [{ stakeHolderId } = { stakeHolderId: "" }],
            } = await getContactPersonById(userId)*/
            const response = await getFieldsByStakeHolderId("stakeHolderId")
            setfields(response)
        }
        fetchFields()
    }, [])

    return (
        <Form className="w-full min-h-main pt-4 pb-12 space-y-2 label:w-full label:text-neutral-700" action={formAction}>
            {sampleInputs.map(({ label, name, unit, values }, key) => (
                <Label size="sm" key={key}>
                    {label}
                    {unit && ` (${unit})`}
                    {values ? (
                        <Select name={name} values={values} />
                    ) : (
                        <Input
                            className="mt-1 focus-within:border-black focus-within:ring-black"
                            type="number"
                            step="0.01"
                            variant="outline"
                            name={name}
                        />
                    )}
                    {state.schema && state.schema[name as keyof PositionSoilDatasWithoutIds] && (
                        <p className="mt-1 text-xs text-red-400">
                            {state.schema[name as keyof PositionSoilDatasWithoutIds]?.toString()}
                        </p>
                    )}
                </Label>
            ))}
            <Label>
                Field
                {/*todo fix*/}
                <SelectGeneric values={fields} id="fieldId" value="fieldId" name="zoneId" />
            </Label>
            <Submit className="mt-6" fullWidth>
                Add
            </Submit>
            {state.message && <p className="mt-4 py-2 px-10 text-sm text-red-500 rounded-md bg-red-100">{state.message}</p>}
        </Form>
    )
}
