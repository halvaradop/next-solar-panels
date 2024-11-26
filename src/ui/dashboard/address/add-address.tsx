"use client"

import { AddAddressActionState } from "@/lib/@types/types"
import { addAddressAction } from "@/lib/actions"
import { Button } from "@halvaradop/ui-button"
import { Form } from "@halvaradop/ui-form"
import { Input } from "@halvaradop/ui-input"
import { Label } from "@halvaradop/ui-label"
import { useFormState } from "react-dom"

export const AddAddress = () => {
    const [state, formAction] = useFormState(addAddressAction, {
        message: "",
        isSuccess: false,
        schema: {} as AddAddressActionState["schema"],
    })

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md mt-10">
            <h1 className="text-2xl font-bold mb-6 text-center">Register Address</h1>
            <Form className="space-y-4" action={formAction}>
                <div>
                    <Label className="block text-sm font-medium text-gray-700">Country</Label>
                    <Input
                        type="text"
                        name="country"
                        required
                        className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    />
                </div>
                <div>
                    <Label className="block text-sm font-medium text-gray-700">State</Label>
                    <Input
                        type="text"
                        name="state"
                        required
                        className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    />
                </div>
                <div>
                    <Label className="block text-sm font-medium text-gray-700">City</Label>
                    <Input
                        type="text"
                        name="city"
                        required
                        className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    />
                </div>
                <div>
                    <Label className="block text-sm font-medium text-gray-700">Postbox</Label>
                    <Input
                        type="text"
                        name="postbox"
                        required
                        className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    />
                </div>
                <div>
                    <Label className="block text-sm font-medium text-gray-700">Street</Label>
                    <Input
                        type="text"
                        name="street"
                        required
                        className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    />
                </div>
                <div>
                    <Label className="block text-sm font-medium text-gray-700">Number</Label>
                    <input
                        type="text"
                        name="number"
                        required
                        className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    />
                </div>
                <Button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
                >
                    Register
                </Button>
            </Form>
        </div>
    )
}
