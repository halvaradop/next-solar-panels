import Link from "next/link"
import { Metadata } from "next"
import { Login } from "@/ui/session/login"

export const metadata: Metadata = {
    title: "Log In",
    description: "Log in to your account",
}

const LoginPage = () => {
    return (
        <div className="min-h-main flex items-center justify-center">
            <div className="mx-auto p-5 text-center rounded-lg">
                <h1 className="mb-10 text-xl font-bold ">Log In</h1>
                <Login />
                <Link className="text-xs text-neutral-800 underline block mt-3" href="/">
                    Forget your password?
                </Link>
            </div>
        </div>
    )
}

export default LoginPage
