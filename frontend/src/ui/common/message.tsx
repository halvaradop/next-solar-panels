import { MessageProps } from "@/lib/@types/props"
import { merge } from "@halvaradop/ui-core"

export const Message = ({ className, schema, index }: MessageProps) => {
    return (
        schema &&
        schema[index] && (
            <p className={merge("w-full mt-1 p-2 text-xs text-red-500 rounded-md bg-red-100", className)}>{schema[index]}</p>
        )
    )
}
