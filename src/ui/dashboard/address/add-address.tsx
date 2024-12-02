"use client"
import { useActionState } from "react"
import { AddAddressActionState } from "@/lib/@types/types"
import { addAddressAction } from "@/lib/actions"
import { Form, InputList, Submit } from "@/ui/common/form-elements"
import dataJson from "@/lib/data.json"

const { addressInputs } = dataJson

export const AddAddress = () => {
    const [state, formAction] = useActionState(addAddressAction, {
        message: "",
        isSuccess: false,
        schema: {} as AddAddressActionState["schema"],
    })

    return (
        <Form className="space-y-4" action={formAction}>
            <h1 className="text-2xl font-bold text-center">Register Address</h1>
            <InputList inputs={addressInputs} state={state} />
            <Submit className="w-full text-white py-2 rounded-md border-blue-600 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300">
                Register
            </Submit>
        </Form>
    )
}
