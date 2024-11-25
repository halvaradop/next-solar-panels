"use client"
import { useFormStatus } from "react-dom"
import { SubmitProps } from "@/lib/@types/props"
import { Button } from "@halvaradop/ui-button"

export const Submit = ({ children, pending = "...", asChild, ...props }: SubmitProps) => {
    const { pending: status } = useFormStatus()
    return (
        <Button disabled={status} {...props}>
            {status ? pending : children}
        </Button>
    )
}
