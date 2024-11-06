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
import arrowDown from "@/public/arrow.svg"

const AddSample = () => {
    const [zones, setZones] = useState<Zone[]>([])
    const [state, formAction] = useFormState(addSampleAction, {
        message: "",
        isSuccess: false,
    } as AddSampleActionState)
    const [errors, setErrors] = useState({
        material: "",
    })
    useEffect(() => {
        const fetchZones = async () => {
            const response = await fetch("/api/zones")
            const json = await response.json()
            setZones(json.data)
        }
        fetchZones()
    }, [])

    const handleTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        if (!/^[a-zA-Z\s]*$/.test(value)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: "Please enter only letters",
            }))
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: "",
            }))
        }
    }

    return (
        <Form className="min-h-main pt-4" action={formAction}>
            <Label className="w-full text-neutral-700" size="sm">
                Material
                <Input
                    className="mt-1 focus-within:border-black focus-within:ring-black"
                    variant="outline"
                    name="material"
                    onInput={handleTextInput}
                />
                {errors.material && <p className="text-red-500 text-sm">{errors.material}</p>}
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

export default AddSample
