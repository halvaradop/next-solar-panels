"use client"
import { useFormStatus } from "react-dom"
import { SubmitProps } from "@/lib/@types/props"
import { Button, buttonVariants } from "@halvaradop/ui-button"

export const Submit = ({
    className,
    variant,
    size,
    fullRounded,
    fullWidth,
    children,
    pending = "...",
    asChild,
    ...props
}: SubmitProps) => {
    const { pending: status } = useFormStatus()
    return (
        <Button
            className={buttonVariants({ className, variant, size, fullWidth, fullRounded })}
            type="submit"
            disabled={status}
            {...props}
        >
            {status ? pending : children}
        </Button>
    )
}
