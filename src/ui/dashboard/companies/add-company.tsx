"use client"
import { addCompanyAction } from "@/lib/actions"
import { useSession } from "next-auth/react"
import { useFormState } from "react-dom"
import { Form } from "@halvaradop/ui-form"
import { Input } from "@halvaradop/ui-input"
import { Label } from "@halvaradop/ui-label"
import { Button } from "@halvaradop/ui-button"
import { AddCompanieActionState } from "@/lib/@types/types"

export const AddCompany = () => {
    const { data: session } = useSession()
    const [state, formAction] = useFormState(addCompanyAction, {
        message: "",
        isSuccess: false,
    } as AddCompanieActionState)

    return (
        <Form className="w-full min-h-main pt-4" action={formAction}>
            <Label className="w-full text-neutral-700" size="sm">
                Name
                <Input
                    className="mt-1 focus-within:border-black focus-within:ring-black"
                    type="text"
                    variant="outline"
                    name="companyName"
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
                phone
                <Input
                    className="mt-1 focus-within:border-black focus-within:ring-black"
                    type="number"
                    variant="outline"
                    name="phone"
                    required
                />
            </Label>

            <Button className="mt-6" fullWidth>
                Add
            </Button>
        </Form>
    )
}
