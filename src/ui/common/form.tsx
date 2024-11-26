import NextForm from "next/form"
import { FormProps } from "@/lib/@types/props"
import { formVariants } from "@halvaradop/ui-form"

export const Form = ({ className, variant, size, action, children, ...props }: FormProps) => {
    return (
        <NextForm className={formVariants({ className, variant, size })} action={action} {...props}>
            {children}
        </NextForm>
    )
}
