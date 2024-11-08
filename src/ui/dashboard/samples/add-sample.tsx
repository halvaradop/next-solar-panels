"use client"
import Image from "next/image"
import { useFormState } from "react-dom"
import { useEffect, useState } from "react"
import { Form } from "@halvaradop/ui-form"
import { Input } from "@halvaradop/ui-input"
import { Label } from "@halvaradop/ui-label"
import { Button } from "@halvaradop/ui-button"
import { addSampleAction } from "@/lib/actions"
import { AddSampleActionState } from "@/lib/@types/types"
import { Zone } from "@prisma/client"
import { getZones } from "@/lib/services/dashboard"
import arrowDown from "@/public/arrow.svg"

export const AddSample = () => {
    const [zones, setZones] = useState<Zone[]>([])
    const [state, formAction] = useFormState(addSampleAction, {
        message: "",
        isSuccess: false,
    } as AddSampleActionState)

    useEffect(() => {
        const fetchZones = async () => {
            const response = await getZones()
            setZones(response)
        }
        fetchZones()
    }, [])

    return (
        <Form className="w-full min-h-main pt-4" action={formAction}>
            <Label className="w-full text-neutral-700" size="sm">
                Material
                <Input className="mt-1 focus-within:border-black focus-within:ring-black" variant="outline" name="material" />
                {state.schema && state.schema.material && <p className="text-red-500 text-sm">{state.schema.material}</p>}
            </Label>
            <Label className="w-full text-neutral-700" size="sm">
                Corrosion
                <Input
                    className="mt-1 focus-within:border-black focus-within:ring-black"
                    type="number"
                    variant="outline"
                    name="corrosion"
                />
            </Label>
            <Label className="w-full text-neutral-700" size="sm">
                Temperature
                <Input
                    className="mt-1 focus-within:border-black focus-within:ring-black"
                    type="number"
                    variant="outline"
                    name="temperature"
                />
            </Label>
            <Label className="w-full text-neutral-700" size="sm">
                Humidity
                <Input
                    className="mt-1 focus-within:border-black focus-within:ring-black"
                    type="number"
                    variant="outline"
                    name="humidity"
                />
            </Label>
            <Label className="w-full text-neutral-700" size="sm">
                Zone
                <div className="mt1 flex items-center relative">
                    <select className="w-full h-10 pl-3 border rounded-lg appearance-none" name="zone">
                        {zones.map(({ id, name }) => (
                            <option key={id} value={id}>
                                {name}
                            </option>
                        ))}
                    </select>
                    <Image className="absolute right-2" src={arrowDown} alt="arrow down icon" />
                </div>
            </Label>
            <Button className="mt-6" fullWidth>
                Add
            </Button>
        </Form>
    )
}
