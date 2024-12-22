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
            <div className="w-full grid md:grid-cols-2 gap-5">
                <Label className="w-full">
                    Country
                    <Input
                        className="focus-within:border-black focus-within:ring-black"
                        fullWidth
                        variant="outline"
                        name="country"
                    />
                    <Message schema={state.schema} index="country" />
                </Label>
                <Label className="w-full">
                    State/Province
                    <Input
                        className="focus-within:border-black focus-within:ring-black"
                        fullWidth
                        variant="outline"
                        name="state"
                    />
                    <Message schema={state.schema} index="state" />
                </Label>
            </div>
            <div className="w-full grid md:grid-cols-2 gap-5">
                <Label className="w-full">
                    City
                    <Input
                        className="focus-within:border-black focus-within:ring-black"
                        fullWidth
                        variant="outline"
                        name="city"
                    />
                    <Message schema={state.schema} index="city" />
                </Label>
                <Label className="w-full">
                    Postbox
                    <Input
                        className="focus-within:border-black focus-within:ring-black"
                        fullWidth
                        variant="outline"
                        name="postbox"
                    />
                    <Message schema={state.schema} index="postbox" />
                </Label>
            </div>
            <div className="w-full grid md:grid-cols-2 gap-5">
                <Label className="w-full">
                    Street
                    <Input
                        className="focus-within:border-black focus-within:ring-black"
                        fullWidth
                        variant="outline"
                        name="street"
                    />
                    <Message schema={state.schema} index="street" />
                </Label>
                <Label className="w-full">
                    Street Number
                    <Input
                        className="focus-within:border-black focus-within:ring-black"
                        fullWidth
                        variant="outline"
                        name="postbox"
                    />
                    <Message schema={state.schema} index="postbox" />
                </Label>
            </div>
            <div className="w-full grid md:grid-cols-2 gap-5">
                <Label className="w-full">
                    Latitude
                    <Input
                        className="focus-within:border-black focus-within:ring-black"
                        fullWidth
                        variant="outline"
                        name="latitude"
                    />
                    <Message schema={state.schema} index="latitude" />
                </Label>
                <Label className="w-full">
                    Longitude
                    <Input
                        className="focus-within:border-black focus-within:ring-black"
                        fullWidth
                        variant="outline"
                        name="longitude"
                    />
                    <Message schema={state.schema} index="longitude" />
                </Label>
            </div>
            <input type="hidden" name="idStakeholder" defaultValue={idStakeHolder} />
            <Submit className="mt-6" fullWidth>
                Add
            </Submit>
            <AddLayoutProject />
            <Message className="mt-4 text-base text-center" schema={state} index="message" />
        </Form>
    )
}
