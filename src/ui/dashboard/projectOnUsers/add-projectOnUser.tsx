"use client"
import { useEffect, useState } from "react"
import { useFormState } from "react-dom"
import { useSession } from "next-auth/react"
import { Project, User } from "@prisma/client"
import { addProjectOnUserAction } from "@/lib/actions"
import { AddProjectOnUserActionState } from "@/lib/@types/types"
import { getUserById, getUsersByClientId, getProjectsByClientId } from "@/lib/services"
import { Button, Form, Label, SelectGeneric } from "@/ui/common/form"

export const AddProjectOnUser = () => {
    const { data: session } = useSession()
    const [users, setUsers] = useState<User[]>([])
    const [projects, setProjects] = useState<Project[]>([])
    const [state, formAction] = useFormState(addProjectOnUserAction, {
        message: "",
        isSuccess: false,
        schema: {} as AddProjectOnUserActionState["schema"],
    })

    useEffect(() => {
        const getData = async () => {
            const userId = session?.user?.id ? session.user.id : Number.MAX_SAFE_INTEGER.toString()
            const {
                clients: [{ clientId } = { clientId: "" }],
            } = await getUserById(userId)
            const [users, projects] = await Promise.all([getUsersByClientId(clientId), getProjectsByClientId(clientId)])
            setUsers(users)
            setProjects(projects)
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
                Project
                <SelectGeneric values={projects} id="name" value="projectId" name="project" />
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
