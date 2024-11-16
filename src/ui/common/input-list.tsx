import { Input } from "@halvaradop/ui-input"
import { Label } from "@halvaradop/ui-label"
import { InputListProps } from "@/lib/@types/props"

export const InputList = <T,>({ inputs, state }: InputListProps<T>) => {
    return inputs.map(({ label, name, type }) => (
        <Label className="w-full text-neutral-700" size="sm" key={label}>
            {label}
            <Input
                className="mt-1 focus-within:border-black focus-within:ring-black"
                type={type}
                variant="outline"
                name={name}
                required
            />
            {state.schema && state.schema[name as keyof (typeof state)["schema"]] && (
                <p className="mt-1 text-xs text-red-400">{String(state.schema[name as keyof (typeof state)["schema"]])}</p>
            )}
        </Label>
    ))
}
