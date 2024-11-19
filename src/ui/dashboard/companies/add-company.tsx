"use client"
import { addClientAction } from "@/lib/actions"
import { useFormState } from "react-dom"
import { AddClientActionState } from "@/lib/@types/types"
import { Button, Form, InputList } from "@/ui/common/form"
import dataJson from "@/lib/data.json"

const { companyInputs } = dataJson

export const AddCompany = () => {
    const [state, formAction] = useFormState(addClientAction, {
        message: "",
        isSuccess: false,
        schema: {} as AddClientActionState["schema"],
    })

    return (
        <Form className="w-full min-h-main pt-4" action={formAction}>
            <InputList inputs={companyInputs} state={state} />
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
