"use client"
import { useEffect, useState, useActionState } from "react"
import { Project } from "@prisma/client"
import { addFieldsAction } from "@/lib/actions"
import { AddFieldsActionState } from "@/lib/@types/types"
import { getProjectsByStakeHolderId } from "@/lib/services"
import { Submit, Form, Input, Label, Select } from "@/ui/common/form/index"
import { getSessionToken, merge } from "@/lib/utils"
import { ClassNameProps } from "@/lib/@types/props"

export const AddField = ({ className }: ClassNameProps) => {
    const [projects, setProjects] = useState<Project[]>([])
    const [state, formAction] = useActionState(addFieldsAction, {
        message: "",
        isSuccess: false,
    } as AddFieldsActionState)

    useEffect(() => {
        const fetchProjects = async () => {
            const { idStakeHolder } = await getSessionToken()
            const response = await getProjectsByStakeHolderId(idStakeHolder)
            setProjects(response)
        }
        fetchProjects()
    }, [])

    const mapProjects = projects.map(({ idProject, designation }) => ({ key: designation, value: idProject }))

    return (
        <Form className={merge("w-full min-h-main pt-4", className)} action={formAction}>
            <h1 className="text-2xl font-bold text-center">Add Fields</h1>
            <Label className="w-full text-neutral-700" size="sm">
                Designation
                <Input className="mt-1 focus-within:border-black focus-within:ring-black" name="designation" variant="outline" />
            </Label>
            <Label className="w-full flex items-center gap-x-2 text-neutral-700" size="sm">
                Fence
                <Input className="size-4" type="checkbox" name="fence" />
            </Label>
            <Label className="w-full flex items-center gap-x-2 text-neutral-700" size="sm">
                Connection Earthing Fence
                <Input className="size-4" type="checkbox" name="connectionEarthingFence" />
            </Label>
            <Label className="w-full flex items-center gap-x-2 text-neutral-700" size="sm">
                External Current Influence
                <Input className="size-4" type="checkbox" name="externalCurrentInfluence" />
            </Label>
            <Label className="w-full text-neutral-700" size="sm">
                Project
                <Select name="project" values={mapProjects} />
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
                </Label>
                <Label className="w-full">
                    State/Province
                    <Input
                        className="focus-within:border-black focus-within:ring-black"
                        fullWidth
                        variant="outline"
                        name="state"
                    />
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
                </Label>
                <Label className="w-full">
                    Postbox
                    <Input
                        className="focus-within:border-black focus-within:ring-black"
                        fullWidth
                        variant="outline"
                        name="postbox"
                    />
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
                </Label>
                <Label className="w-full">
                    Street Number
                    <Input
                        className="focus-within:border-black focus-within:ring-black"
                        fullWidth
                        variant="outline"
                        name="postbox"
                    />
                </Label>
            </div>
            <div className="w-full grid md:grid-cols-2 gap-5">
                <Label className="w-full">
                    Latitud
                    <Input
                        className="focus-within:border-black focus-within:ring-black"
                        fullWidth
                        variant="outline"
                        name="latitude"
                    />
                </Label>
                <Label className="w-full">
                    Longitude
                    <Input
                        className="focus-within:border-black focus-within:ring-black"
                        fullWidth
                        variant="outline"
                        name="longitude"
                    />
                </Label>
            </div>
            <Submit className="mt-6" fullWidth>
                Add
            </Submit>
            {state.message && (
                <div
                    className={merge("mt-4 p-2 text-green-700 rounded", {
                        "text-red-700 bg-red-100": !state.isSuccess,
                    })}
                >
                    {state.message}
                </div>
            )}
        </Form>
    )
}
