"use client"
import { AddZonesActionState } from "@/lib/@types/types"
import { addZonesAction } from "@/lib/actions"
import { getPlantsByUser } from "@/lib/services/dashboard"
import { Plants } from "@prisma/client"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useFormState } from "react-dom"
import { Form } from "@halvaradop/ui-form"
import { Input } from "@halvaradop/ui-input"
import { Label } from "@halvaradop/ui-label"
import { Button } from "@halvaradop/ui-button"
import Image from "next/image"
import arrowDown from "@/public/arrow.svg"

export const AddZone = () => {
    const { data: session } = useSession()
    const [plants, setPlants] = useState<Plants[]>([])
    const [state, formAction] = useFormState(addZonesAction, {
        message: "",
        isSuccess: false,
    } as AddZonesActionState)

    useEffect(() => {
        const fetchPlants = async () => {
            const userId = Number(session?.user?.id) || Number.MAX_SAFE_INTEGER
            const response = await getPlantsByUser(userId)
            setPlants(response)
        }
        fetchPlants()
    }, [])
    return (
        <Form className="w-full min-h-main pt-4" action={formAction}>
            <Label className="w-full text-neutral-700" size="sm">
                Name
                <Input className="mt-1 focus-within:border-black focus-within:ring-black" variant="outline" name="name" />
            </Label>
            <Label className="w-full text-neutral-700" size="sm">
                Latitude
                <Input
                    className="mt-1 focus-within:border-black focus-within:ring-black"
                    type="number"
                    variant="outline"
                    name="latitude"
                />
            </Label>
            <Label className="w-full text-neutral-700" size="sm">
                Longitude
                <Input
                    className="mt-1 focus-within:border-black focus-within:ring-black"
                    type="number"
                    variant="outline"
                    name="longitude"
                />
            </Label>
            <Label className="w-full text-neutral-700" size="sm">
                Plant
                <div className="mt1 flex items-center relative">
                    <select className="w-full h-10 pl-3 border rounded-lg appearance-none" name="plant">
                        {plants.map(({ plantId, plantName }) => (
                            <option key={plantId} value={plantId}>
                                {plantName}
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
