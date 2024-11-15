"use client"
import { useEffect, useState } from "react"
import { useFormState } from "react-dom"
import { useSession } from "next-auth/react"
import { Users } from "@prisma/client"
import { addPlantAction } from "@/lib/actions"
import { AddPlantActionState } from "@/lib/@types/types"
import { getUserById, getUsersByCompanyId } from "@/lib/services"
import { Button, Form, Input, Label, Select } from "@/ui/common/form"

export const AddPlant = () => {
    const { data: session } = useSession()
    const [users, setUsers] = useState<Users[]>([])
    const [state, formAction] = useFormState(addPlantAction, {
        message: "",
        isSuccess: false,
        schema: {} as AddPlantActionState["schema"],
    })
    const mapUsers = users.map(({ userId, lastName }) => ({ key: lastName, value: userId.toString() }))

    useEffect(() => {
        const fetchUsers = async () => {
            const userId = session?.user?.id ? Number(session.user.id) : Number.MAX_SAFE_INTEGER
            const { companyId } = await getUserById(userId)
            const response = await getUsersByCompanyId(companyId)
            setUsers(response)
        }
        fetchUsers()
    }, [])

    return (
        <Form className="w-full min-h-main pt-4" action={formAction}>
            <Label className="w-full text-neutral-700" size="sm">
                PLant Name
                <Input
                    className="mt-1 focus-within:border-black focus-within:ring-black"
                    type="text"
                    variant="outline"
                    name="plantName"
                    required
                />
            </Label>
            <Label className="w-full text-neutral-700" size="sm">
                Latitude
                <Input
                    className="mt-1 focus-within:border-black focus-within:ring-black"
                    type="number"
                    variant="outline"
                    name="latitude"
                    required
                />
            </Label>
            <Label className="w-full text-neutral-700" size="sm">
                Longitude
                <Input
                    className="mt-1 focus-within:border-black focus-within:ring-black"
                    type="number"
                    variant="outline"
                    name="longitude"
                    required
                />
            </Label>
            <Label className="w-full text-neutral-700" size="sm">
                User
                <Select name="user" values={mapUsers} />
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
