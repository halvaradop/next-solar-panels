"use client"
import Link from "next/link"
import { useFormState } from "react-dom"
import { Input } from "@halvaradop/ui-input"
import { Label } from "@halvaradop/ui-label"
import { Button } from "@halvaradop/ui-button"
import { loginAction } from "@/lib/actions"
import { merge } from "@/lib/merge"

export const Login = () => {
    const [state, formAction] = useFormState(loginAction, {
        message: "",
        isSuccess: false,
    })

    return (
        <form className="flex flex-col gap-y-4" action={formAction}>
            <Label className="w-full text-neutral-700 text-left" size="sm">
                Email address or user name
                <Input
                    className="mt-1 focus-within::border-black focus-within:ring-black"
                    type="email"
                    variant="outline"
                    name="email"
                />
            </Label>
            <Label className="w-full text-neutral-700 text-left" size="sm">
                Password
                <Input
                    className="mt-1 focus-within:border-black focus-within:ring-black"
                    type="password"
                    variant="outline"
                    name="password"
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
            <Button fullWidth>Log In</Button>
            {state.message && (
                <p
                    className={merge("p-2 text-sm text-green-400 rounded-md bg-green-100", {
                        "text-red-500 bg-red-100": !state.isSuccess,
                    })}
                >
                    {state.message}
                </p>
            )}
        </form>
    )
}
