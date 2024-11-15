"use client"
import { useEffect, useState } from "react"
import { useFormState } from "react-dom"
import { useSession } from "next-auth/react"
import { Users } from "@prisma/client"
import { addPlantAction } from "@/lib/actions"
import { AddPlantActionState } from "@/lib/@types/types"
import { getUserById, getUsersByCompanyId } from "@/lib/services"
import { Button, Form, InputList, Label, Select } from "@/ui/common/form"
import dataJson from "@/lib/data.json"

const { plantInputs } = dataJson
export const fetchCache = "force-no-store"

export const AddPlant = () => {
    const { data: session } = useSession()
    const [users, setUsers] = useState<Users[]>([])
    const [state, formAction] = useFormState(addPlantAction, {
        message: "",
        isSuccess: false,
        schema: {} as AddPlantActionState["schema"],
    })

    useEffect(() => {
        /**
         * TODO: fix bug
         */
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
            <InputList inputs={plantInputs} state={state} />
            <Label className="w-full text-neutral-700" size="sm">
                User
                <Select values={users} id="lastName" value="userId" name="user" />
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
