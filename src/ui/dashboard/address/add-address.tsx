"use client"
import { useActionState } from "react"
import { AddAddressActionState } from "@/lib/@types/types"
import { addAddressAction } from "@/lib/actions"
import { Form, Input, Label, Submit } from "@/ui/common/form/index"

export const AddAddress = () => {
    const [state, formAction] = useActionState(addAddressAction, {
        message: "",
        isSuccess: false,
        schema: {} as AddAddressActionState["schema"],
    })

    return (
        <Form className="space-y-4" action={formAction}>
            <h1 className="text-2xl font-bold text-center">Register Address</h1>
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
                        name="latitud"
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
            <Submit className="w-full text-white py-2 rounded-md border-blue-600 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300">
                Register
            </Submit>
        </Form>
    )
}
