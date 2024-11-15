"use client"
import { useEffect, useState } from "react"
import { useFormState } from "react-dom"
import { useSession } from "next-auth/react"
import { Plants, Users } from "@prisma/client"
import { addUserPlantsAction } from "@/lib/actions"
import { AddPUserPlantsActionState } from "@/lib/@types/types"
import { getUserById, getUsersByCompanyId, getPlantsByCompanyId } from "@/lib/services"
import { Button, Form, Label, SelectGeneric } from "@/ui/common/form"

export const AddUserPlant = () => {
    const { data: session } = useSession()
    const [users, setUsers] = useState<Users[]>([])
    const [plants, setPlants] = useState<Plants[]>([])
    const [state, formAction] = useFormState(addUserPlantsAction, {
        message: "",
        isSuccess: false,
        schema: {} as AddPUserPlantsActionState["schema"],
    })

    useEffect(() => {
        const getData = async () => {
            const userId = session?.user?.id ? Number(session.user.id) : Number.MAX_SAFE_INTEGER
            const { companyId } = await getUserById(userId)
            const [users, plants] = await Promise.all([getUsersByCompanyId(companyId), getPlantsByCompanyId(companyId)])
            setUsers(users)
            setPlants(plants)
        }
        getData()
    }, [])

    return (
        <Form className="w-full min-h-main pt-4" action={formAction}>
            <Label className="w-full text-neutral-700" size="sm">
                User
                <SelectGeneric values={users} id="lastName" value="userId" name="user" />
            </Label>
            <Label className="w-full text-neutral-700" size="sm">
                Plant
                <SelectGeneric values={plants} id="plantName" value="plantId" name="plant" />
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
