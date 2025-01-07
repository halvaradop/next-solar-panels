"use client"
import { useFormStatus } from "react-dom"
import { Button, buttonVariants, ButtonProps } from "@halvaradop/ui-button"

/**
 * @internal
 */
type SubmitProps = Omit<ButtonProps<typeof buttonVariants>, "asChild"> & {
    children: React.ReactNode
    pending?: string
}

export const Submit = ({
    className,
    variant,
    size,
    fullRounded,
    fullWidth,
    children,
    pending = "...",
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
