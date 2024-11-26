"use client"
import { useFormState } from "react-dom"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { Zone } from "@prisma/client"
import { addSampleAction } from "@/lib/actions"
import { AddSampleActionState, SamplesWithoutIds } from "@/lib/@types/types"
import { getZonesByClientId, getUserById } from "@/lib/services"
import { Form, Input, Label, SelectGeneric, Select } from "@/ui/common/form-elements"
import { Submit } from "@/ui/common/submit"
import dataJson from "@/lib/data.json"

const { sampleInputs } = dataJson

export const AddSample = () => {
    const { data: session } = useSession()
    const [zones, setZones] = useState<Zone[]>([])
    const [state, formAction] = useFormState(addSampleAction, {
        message: "",
        isSuccess: false,
        schema: {} as AddSampleActionState["schema"],
    })

    useEffect(() => {
        const fetchZones = async () => {
            const userId = session?.user?.id || Number.MAX_SAFE_INTEGER.toString()
            const {
                clients: [{ clientId } = { clientId: "" }],
            } = await getUserById(userId)
            const response = await getZonesByClientId(clientId)
            setZones(response)
        }
        fetchZones()
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
                    {state.schema && state.schema[name as keyof SamplesWithoutIds] && (
                        <p className="mt-1 text-xs text-red-400">{state.schema[name as keyof SamplesWithoutIds]?.toString()}</p>
                    )}
                </Label>
            ))}
            <Label>
                Zone
                <SelectGeneric values={zones} id="name" value="zoneId" name="zoneId" />
            </Label>
            <Submit className="mt-6" fullWidth>
                Add
            </Submit>
            {state.message && <p className="mt-4 py-2 px-10 text-sm text-red-500 rounded-md bg-red-100">{state.message}</p>}
        </Form>
    )
}
