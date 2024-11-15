"use client"
import { addUserAction } from "@/lib/actions"
import { useFormState } from "react-dom"
import { Form } from "@halvaradop/ui-form"
import { Input } from "@halvaradop/ui-input"
import { Label } from "@halvaradop/ui-label"
import { Button } from "@halvaradop/ui-button"
import { AddUserActionState } from "@/lib/@types/types"
import { Roles } from "@prisma/client"
import { useEffect, useState } from "react"
import { getRoles } from "@/lib/services"
import { Select } from "@/ui/common/select"
import dataJson from "@/lib/data.json"

const { userInputs } = dataJson

export const AddUser = () => {
    const [roles, setRoles] = useState<Roles[]>([])
    const [state, formAction] = useFormState(addUserAction, {
        message: "",
        isSuccess: false,
        schema: {} as AddUserActionState["schema"],
    })
    const mapRoles = roles.map(({ roleId, roleName }) => ({ key: roleName, value: roleId.toString() }))

    useEffect(() => {
        const fetchRoles = async () => {
            const response = await getRoles()
            setRoles(response)
        }
        fetchRoles()
    }, [])

    return (
        <Form className="w-full min-h-main pt-4" action={formAction}>
            {userInputs.map(({ label, name, type }) => (
                <Label className="w-full text-neutral-700" size="sm" key={label}>
                    {label}
                    <Input
                        className="mt-1 focus-within:border-black focus-within:ring-black"
                        type={type}
                        variant="outline"
                        name={name}
                        required
                    />
                    {state.schema && state.schema[name as keyof AddUserActionState["schema"]] && (
                        <p className="mt-1 text-xs text-red-400">{state.schema[name as keyof AddUserActionState["schema"]]}</p>
                    )}
                </Label>
            ))}
            <Label className="w-full text-neutral-700" size="sm">
                Role
                <Select name="rol" values={mapRoles} />
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
