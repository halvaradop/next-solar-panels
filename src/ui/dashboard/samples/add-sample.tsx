"use client"
import { useFormState } from "react-dom"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { Zones } from "@prisma/client"
import { addSampleAction } from "@/lib/actions"
import { AddSampleActionState, Entry, SamplesWithoutIds } from "@/lib/@types/types"
import { getZonesByUser } from "@/lib/services"
import { Form } from "@halvaradop/ui-form"
import { Input } from "@halvaradop/ui-input"
import { Label } from "@halvaradop/ui-label"
import { Button } from "@halvaradop/ui-button"
import { Select } from "@/ui/common/select"
import dataJson from "@/lib/data.json"

const { sampleInputs } = dataJson

export const AddSample = () => {
    const { data: session } = useSession()
    const [zones, setZones] = useState<Zones[]>([])
    const [state, formAction] = useFormState(addSampleAction, {
        message: "",
        isSuccess: false,
        schema: {} as AddSampleActionState["schema"],
    })
    const mapZones = zones.map<Entry>(({ zoneId, name }) => ({ key: name, value: zoneId.toString() }))

    useEffect(() => {
        /**
         * TODO: Implement the right logic to fetch zones by company of the user that is logged in
         */
        const fetchZones = async () => {
            const userId = Number(session?.user?.id) || Number.MAX_SAFE_INTEGER
            const response = await getZonesByUser(userId)
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
                <Select name="zoneId" values={mapZones} />
            </Label>
            <Button className="mt-6" fullWidth>
                Add
            </Button>
        </Form>
    )
}
