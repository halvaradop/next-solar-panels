"use client"

import { useEffect, useState, useActionState } from "react"
import { useSession } from "next-auth/react"
import { User } from "@prisma/client"
import { addProjectAction } from "@/lib/actions"
import { AddProjectActionState } from "@/lib/@types/types"
import { getUserById, getUsersByClientId } from "@/lib/services"
import { Button, Form, InputList, Label, SelectGeneric } from "@/ui/common/form-elements"
import dataJson from "@/lib/data.json"

const { projectInputs } = dataJson
export const fetchCache = "force-no-store"

export const AddPlant = () => {
    const { data: session } = useSession()
    const [users, setUsers] = useState<User[]>([])
    const [state, formAction] = useActionState(addProjectAction, {
        message: "",
        isSuccess: false,
        schema: {} as AddProjectActionState["schema"],
    })

    useEffect(() => {
        /**
         * TODO: fix bug
         */
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
            <InputList inputs={projectInputs} state={state} />
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
