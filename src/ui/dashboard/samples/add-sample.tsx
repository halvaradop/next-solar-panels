"use client"
import { useFormState } from "react-dom"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { Zone } from "@prisma/client"
import { addSampleAction } from "@/lib/actions"
import { AddSampleActionState, SamplesWithoutIds } from "@/lib/@types/types"
import { getZonesByClientId, getUserById } from "@/lib/services"
import { Button, Form, Input, Label, SelectGeneric, Select } from "@/ui/common/form"
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
        /**
         * TODO: Implement the right logic to fetch zones by company of the user that is logged in
         */
        const fetchZones = async () => {
            const userId = session?.user?.id || Number.MAX_SAFE_INTEGER.toString()
            const { projectsOnUsers } = await getUserById(userId)
            const clientId = projectsOnUsers[0]?.project.clients.clientId
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
            <Button className="mt-6" fullWidth>
                Add
            </Button>
        </Form>
    )
}
