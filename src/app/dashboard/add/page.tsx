"use client"
import Image from "next/image"
import { useFormState } from "react-dom"
import { Form } from "@halvaradop/ui-form"
import { Input } from "@halvaradop/ui-input"
import { Label } from "@halvaradop/ui-label"
import { Button } from "@halvaradop/ui-button"
import { addSampleAction } from "@/lib/actions"
import { AddSampleActionState } from "@/lib/@types/types"
import arrowDown from "@/public/arrow.svg"

const AddSample = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, formAction] = useFormState(addSampleAction, {
        message: "",
        isSuccess: false,
    } as AddSampleActionState)

    return (
        <Form className="min-h-main pt-4" action={formAction}>
            <Label className="w-full text-neutral-700" size="sm">
                Material
                <Input className="mt-1 focus-within:border-black focus-within:ring-black" variant="outline" name="material" />
            </Label>
            <Label className="w-full text-neutral-700" size="sm">
                Corrosion
                <Input className="mt-1 focus-within:border-black focus-within:ring-black" variant="outline" name="corrosion" />
            </Label>
            <Label className="w-full text-neutral-700" size="sm">
                Temperature
                <Input className="mt-1 focus-within:border-black focus-within:ring-black" variant="outline" name="temperature" />
            </Label>
            <Label className="w-full text-neutral-700" size="sm">
                Humidity
                <Input className="mt-1 focus-within:border-black focus-within:ring-black" variant="outline" name="humidity" />
            </Label>
            <Label className="w-full text-neutral-700" size="sm">
                Zone
                <div className="mt1 flex items-center relative">
                    <select className="w-full h-10 pl-3 border rounded-lg appearance-none" name="zone">
                        <option value="zone-1">Zone 1</option>
                        <option value="zone-2">Zone 2</option>
                        <option value="zone-3">Zone 3</option>
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
