"use client"
import { useFormState } from "react-dom"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { Plants } from "@prisma/client"
import { addZonesAction } from "@/lib/actions"
import { AddZonesActionState } from "@/lib/@types/types"
import { Form } from "@halvaradop/ui-form"
import { Input } from "@halvaradop/ui-input"
import { Label } from "@halvaradop/ui-label"
import { Button } from "@halvaradop/ui-button"
import { Select } from "@/ui/common/select"
import { getPlantsByCompanyId, getUserById } from "@/lib/services"

export const AddZone = () => {
    const { data: session } = useSession()
    const [plants, setPlants] = useState<Plants[]>([])
    const [state, formAction] = useFormState(addZonesAction, {
        message: "",
        isSuccess: false,
    } as AddZonesActionState)
    const mapPlants = plants.map(({ plantId, plantName }) => ({ key: plantName, value: plantId.toString() }))

    useEffect(() => {
        const fetchPlants = async () => {
            const userId = session?.user?.id ? Number(session.user.id) : Number.MAX_SAFE_INTEGER
            const { companyId } = await getUserById(userId)
            const response = await getPlantsByCompanyId(companyId)
            setPlants(response)
        }
        fetchPlants()
    }, [])

    return (
        <Form className="w-full min-h-main pt-4" action={formAction}>
            <Label className="w-full text-neutral-700" size="sm">
                Name
                <Input className="mt-1 focus-within:border-black focus-within:ring-black" variant="outline" name="name" />
                {state.schema && state.schema["name"] && (
                    <p className="mt-1 text-xs text-red-400">{state.schema["name"]?.toString()}</p>
                )}
            </Label>
            <Label className="w-full text-neutral-700" size="sm">
                Latitude
                <Input
                    className="mt-1 focus-within:border-black focus-within:ring-black"
                    type="number"
                    variant="outline"
                    name="latitude"
                />
                {state.schema && state.schema["latitude"] && (
                    <p className="mt-1 text-xs text-red-400">{state.schema["latitude"]?.toString()}</p>
                )}
            </Label>
            <Label className="w-full text-neutral-700" size="sm">
                Longitude
                <Input
                    className="mt-1 focus-within:border-black focus-within:ring-black"
                    type="number"
                    variant="outline"
                    name="longitude"
                />
                {state.schema && state.schema["longitude"] && (
                    <p className="mt-1 text-xs text-red-400">{state.schema["longitude"]?.toString()}</p>
                )}
            </Label>
            <Label className="w-full text-neutral-700" size="sm">
                Plant
                <Select name="plant" values={mapPlants} />
            </Label>
            <Button className="mt-6" fullWidth>
                Add
            </Button>
        </Form>
    )
}
