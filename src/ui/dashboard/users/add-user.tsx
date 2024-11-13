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
import Image from "next/image"
import { getRoles } from "@/lib/services/dashboard"
import arrowDown from "@/public/arrow.svg"

export const AddUser = () => {
    const [roles, setRoles] = useState<Roles[]>([])
    const [state, formAction] = useFormState(addUserAction, {
        message: "",
        isSuccess: false,
    } as AddUserActionState)

    useEffect(() => {
        const fetchRoles = async () => {
            const response = await getRoles()
            setRoles(response)
        }
        fetchRoles()
    }, [])

    return (
        <Form className="w-full min-h-main pt-4" action={formAction}>
            <Label className="w-full text-neutral-700" size="sm">
                Frist name
                <Input
                    className="mt-1 focus-within:border-black focus-within:ring-black"
                    type="text"
                    variant="outline"
                    name="firstName"
                    required
                />
            </Label>
            <Label className="w-full text-neutral-700" size="sm">
                Last Name
                <Input
                    className="mt-1 focus-within:border-black focus-within:ring-black"
                    type="text"
                    variant="outline"
                    name="lastName"
                    required
                />
            </Label>
            <Label className="w-full text-neutral-700" size="sm">
                Email
                <Input
                    className="mt-1 focus-within:border-black focus-within:ring-black"
                    type="email"
                    variant="outline"
                    name="email"
                    required
                />
            </Label>

            <Label className="w-full text-neutral-700" size="sm">
                Password
                <Input
                    className="mt-1 focus-within:border-black focus-within:ring-black"
                    type="password"
                    variant="outline"
                    name="password"
                    required
                />
            </Label>

            <Label className="w-full text-neutral-700" size="sm">
                Phone
                <Input
                    className="mt-1 focus-within:border-black focus-within:ring-black"
                    type="text"
                    variant="outline"
                    name="phone"
                    required
                />
            </Label>

            <Label className="w-full text-neutral-700" size="sm">
                Rol
                <div className="mt1 flex items-center relative">
                    <select className="w-full h-10 pl-3 border rounded-lg appearance-none" name="rol">
                        {roles.map(({ roleId, roleName }) => (
                            <option key={roleId} value={roleId}>
                                {roleName}
                            </option>
                        ))}
                    </select>
                    <Image className="absolute right-2" src={arrowDown} alt="arrow down icon" />
                </div>
            </Label>
            <Button className="mt-6" fullWidth>
                Add
            </Button>
        </Form>
    )
}
