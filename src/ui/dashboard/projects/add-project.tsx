"use client"
import { useEffect, useState, useActionState } from "react"
import { ContactPerson } from "@prisma/client"
import { addProjectAction } from "@/lib/actions"
import { AddProjectActionState } from "@/lib/@types/types"
import { getContactPersonByStakeHolderId } from "@/lib/services"
import { Form, Input, Label, Select, Submit, merge } from "@/ui/common/form/index"
import { ClassNameProps } from "@/lib/@types/props"
import { getSessionToken } from "@/lib/utils"
import { AddLayoutProject } from "./add-layout-project"
import { Message } from "@/ui/common/message"
import { InternalAddress } from "@/ui/dashboard/address/address"

export const AddProject = ({ className }: ClassNameProps) => {
    const [contactPersons, setContactPerson] = useState<ContactPerson[]>([])
    const [idStakeHolder, setIdStakeHolder] = useState<string>("")
    const [state, formAction] = useActionState(addProjectAction, {
        message: "",
        isSuccess: false,
        schema: {} as AddProjectActionState["schema"],
    })

    useEffect(() => {
        const fetchProjects = async () => {
            const { idStakeHolder } = await getSessionToken()
            const response = await getContactPersonByStakeHolderId(idStakeHolder)
            setContactPerson(response)
            setIdStakeHolder(idStakeHolder)
        }
        fetchProjects()
    }, [])

    const mapContactPeople = contactPersons.map(({ idContactPerson, lastName }) => ({ key: lastName, value: idContactPerson }))

    return (
        <Form className={merge("w-full max-w-none min-h-main pt-4", className)} action={formAction}>
            <Label className="w-full">
                Project Name
                <Input className="focus-within:border-black focus-within:ring-black" fullWidth variant="outline" name="name" />
            </Label>
            <Label className="w-full text-neutral-700" size="sm">
                Project Manager
                <Select name="contactPerson" values={mapContactPeople} />
            </Label>
            <InternalAddress state={state} />
            <input type="hidden" name="idStakeholder" defaultValue={idStakeHolder} />
            <Submit className="mt-6" fullWidth>
                Add
            </Submit>
            <AddLayoutProject />
            <Message className="mt-4 text-base text-center" schema={state} index="message" />
        </Form>
    )
}
