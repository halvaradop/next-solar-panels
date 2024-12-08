"use client"
import { useEffect, useState, useActionState } from "react"
import { useSession } from "next-auth/react"
import { ContactPerson, Project } from "@prisma/client"
import { addProjectOnUserAction } from "@/lib/actions"
import { AddProjectOnUserActionState } from "@/lib/@types/types"
import { getContactPersonById, getContactPersonByStakeHolderId, getProjectsByStakeHolderId } from "@/lib/services"
import { Button, Form, Label, SelectGeneric } from "@/ui/common/form-elements"

export const AddProjectOnUser = () => {
    const { data: session } = useSession()
    const [contactPersons, setcontactPersons] = useState<ContactPerson[]>([])
    const [projects, setProjects] = useState<Project[]>([])
    const [state, formAction] = useActionState(addProjectOnUserAction, {
        message: "",
        isSuccess: false,
        schema: {} as AddProjectOnUserActionState["schema"],
    })

    useEffect(() => {
        const getData = async () => {
            const userId = session?.user?.id ? session.user.id : Number.MAX_SAFE_INTEGER.toString()
            /*  TODO : fix stakeholderid
          const {
                stakeHolders: [{ stakeHolderId } = { stakeHolderId: "" }],
            } = await getContactPersonById(userId)*/
            const [conctacPerson, projects] = await Promise.all([
                getContactPersonByStakeHolderId(""),
                getProjectsByStakeHolderId(""),
            ])
            setcontactPersons(conctacPerson)
            setProjects(projects)
        }
        getData()
    }, [])

    return (
        <Form className="w-full min-h-main pt-4" action={formAction}>
            <Label className="w-full text-neutral-700" size="sm">
                User
                <SelectGeneric values={contactPersons} id="lastName" value="idContactPerson" name="user" />
            </Label>
            <Label className="w-full text-neutral-700" size="sm">
                Project
                <SelectGeneric values={projects} id="designation" value="idProject" name="project" />
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
