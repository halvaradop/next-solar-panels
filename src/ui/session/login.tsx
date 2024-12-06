"use client"
import Image from "next/image"
import Link from "next/link"
import { useActionState, useState } from "react"
import { Form, Input, Label, Submit } from "@/ui/common/form-elements"
import { merge } from "@/lib/utils"
import { loginAction } from "@/lib/actions"
import visibility from "@/public/visibility.svg"
import visibilityOff from "@/public/visibility-off.svg"

export const Login = () => {
    const [isVisible, setIsVisible] = useState(false)
    const [state, formAction] = useActionState(loginAction, {
        message: "",
        isSuccess: false,
    })

    const handleVisibility = () => setIsVisible(!isVisible)

    return (
        <Form className="w-full !p-0 flex flex-col gap-y-4" action={formAction}>
            <Label className="w-full text-neutral-700 text-left" size="sm">
                Email address or user name
                <Input
                    className="mt-1 focus-within::border-black focus-within:ring-black"
                    type="email"
                    variant="outline"
                    name="email"
                />
            </Label>
            <Label className="w-full mt-6 flex items-center text-left" size="sm">
                <Label className="absolute -top-6 text-neutral-700" size="sm">
                    Password
                </Label>
                <Input
                    className="focus-within:border-black focus-within:ring-black"
                    type={isVisible ? "text" : "password"}
                    variant="outline"
                    name="password"
                />
                <Image
                    className="absolute right-2 hover:cursor-pointer"
                    src={isVisible ? visibility : visibilityOff}
                    alt={isVisible ? "Hide password" : "Show password"}
                    onClick={handleVisibility}
                />
            </Label>
            <p className="text-xs text-neutral-600 mb-3">
                <span>By continuing, you agree to the </span>
                <Link className="text-neutral-800 underline" href="/">
                    Terms of Use
                </Link>
                <span> and </span>
                <Link className="text-neutral-800 underline" href="/">
                    Privacy Policy
                </Link>
                <span>.</span>
            </p>
            <Submit fullWidth>Log In</Submit>
            {state.message && (
                <p
                    className={merge("p-2 text-sm text-green-400 rounded-md bg-green-100", {
                        "text-red-500 bg-red-100": !state.isSuccess,
                    })}
                >
                    {state.message}
                </p>
            )}
        </Form>
    )
}
