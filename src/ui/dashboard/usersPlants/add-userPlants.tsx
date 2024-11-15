"use client"
import { useFormState } from "react-dom"
import { Form } from "@halvaradop/ui-form"
import { Label } from "@halvaradop/ui-label"
import { Button } from "@halvaradop/ui-button"
import { addUserPlantsAction } from "@/lib/actions"
import { AddPUserPlantsActionState } from "@/lib/@types/types"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { Plants, Users } from "@prisma/client"
import { getPlantByCompany, getUserByCompany } from "@/lib/services"
import { Select } from "@/ui/common/select"

export const AddUserPlant = () => {
    const { data: session } = useSession()
    const [users, setUsers] = useState<Users[]>([])
    const [plants, setPlants] = useState<Plants[]>([])
    const [state, formAction] = useFormState(addUserPlantsAction, {
        message: "",
        isSuccess: false,
        schema: {} as AddPUserPlantsActionState["schema"],
    })
    const mapPlants = plants.map(({ plantId, plantName }) => ({ key: plantName, value: plantId.toString() }))
    const mapUsers = users.map(({ userId, lastName }) => ({ key: lastName, value: userId.toString() }))
    useEffect(() => {
        const fetchUsers = async () => {
            const userId = Number(session?.user?.id) || Number.MAX_SAFE_INTEGER
            const response = await getUserByCompany(userId)
            setUsers(response)
        }
        fetchUsers()
    }, [])
    useEffect(() => {
        const fetchPlants = async () => {
            const userId = Number(session?.user?.id) || Number.MAX_SAFE_INTEGER
            const response = await getPlantByCompany(userId)
            setPlants(response)
        }
        fetchPlants()
    }, [])

    return (
        <Form className="w-full min-h-main pt-4" action={formAction}>
            <Label className="w-full text-neutral-700" size="sm">
                User
                <Select name="user" values={mapUsers} />
            </Label>
            <Label className="w-full text-neutral-700" size="sm">
                Plant
                <Select name="plant" values={mapPlants} />
            </Label>
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
