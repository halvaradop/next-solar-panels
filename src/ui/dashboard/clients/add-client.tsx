"use client"
import { addClientAction } from "@/lib/actions"
import { useFormState } from "react-dom"
import { AddClientActionState } from "@/lib/@types/types"
import { Button, Form, InputList, Label, SelectGeneric } from "@/ui/common/form-elements"
import dataJson from "@/lib/data.json"
import { useEffect, useState } from "react"
import { getUserById, getUsersByClientId } from "@/lib/services"
import { useSession } from "next-auth/react"
import { User } from "@prisma/client"

const { clientInputs } = dataJson

export const AddClient = () => {
    const { data: session } = useSession()
    const [users, setUsers] = useState<User[]>([])
    const [state, formAction] = useFormState(addClientAction, {
        message: "",
        isSuccess: false,
        schema: {} as AddClientActionState["schema"],
    })

    useEffect(() => {
        const fetchUsers = async () => {
            const userId = session?.user?.id ? session.user.id : Number.MAX_SAFE_INTEGER.toString()
            const {
                clients: [{ clientId } = { clientId: "" }],
            } = await getUserById(userId)
            const response = await getUsersByClientId(clientId)
            setUsers(response)
        }
        fetchUsers()
    }, [])

    return (
        <Form className="w-full min-h-main pt-4" action={formAction}>
            <InputList inputs={clientInputs} state={state} />
            <Label className="w-full text-neutral-700" size="sm">
                User
                <SelectGeneric values={users} id="lastName" value="userId" name="user" />
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
