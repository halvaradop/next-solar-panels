"use client"
import { useActionState } from "react"
import { addPositionSoilDatasPageAction } from "@/lib/actions"
import { AddPositionSoilDatasPageActionState, PositionSoilDatasWithoutIds } from "@/lib/@types/types"
import { Form, Input, Label, Select, Submit, merge } from "@/ui/common/form/index"
import { ClassNameProps } from "@/lib/@types/props"
import dataJson from "@/lib/data.json"

const { PositionSoilDataInputs } = dataJson

export const AddPositionSoilDatas = ({ className }: ClassNameProps) => {
    const [state, formAction] = useActionState(addPositionSoilDatasPageAction, {
        message: "",
        isSuccess: false,
        schema: {} as AddPositionSoilDatasPageActionState["schema"],
    })

    return (
        <Form
            className={merge("w-full min-h-main pt-4 pb-12 space-y-2 label:w-full label:text-neutral-700", className)}
            action={formAction}
        >
            {PositionSoilDataInputs.map(({ label, name, unit, values }, key) => (
                <Label size="sm" key={key}>
                    {label}
                    {unit && ` (${unit})`}
                    {values ? (
                        <Select name={name} values={values} />
                    ) : (
                        <Input
                            className="mt-1 focus-within:border-black focus-within:ring-black"
                            type="number"
                            step="0.01"
                            variant="outline"
                            name={name}
                        />
                    )}
                    {state.schema && state.schema[name as keyof PositionSoilDatasWithoutIds] && (
                        <p className="mt-1 text-xs text-red-400">
                            {state.schema[name as keyof PositionSoilDatasWithoutIds]?.toString()}
                        </p>
                    )}
                </Label>
            ))}
            <Submit className="mt-6" fullWidth>
                Add
            </Submit>
            {state.message && <p className="mt-4 py-2 px-10 text-sm text-red-500 rounded-md bg-red-100">{state.message}</p>}
        </Form>
    )
}
