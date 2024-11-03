import Link from "next/link"
import { Input } from "@halvaradop/ui-input"
import { Label } from "@halvaradop/ui-label"
import { Button } from "@halvaradop/ui-button"

const Login = () => {
    return (
        <div className="min-h-main flex items-center justify-center">
            <div className="w-80 h-100 mx-auto p-5 text-center rounded-lg">
                <h1 className="text-xl text-left font-bold mb-5">Log In</h1>
                <form className="flex flex-col gap-y-4">
                    <Label className="w-full text-neutral-500 text-left" size="sm">
                        Email address or user name
                        <Input className="mt-1" type="email" variant="outline" />
                    </Label>
                    <Label className="w-full text-neutral-500 text-left" size="sm">
                        Password
                        <Input className="mt-1" type="password" variant="outline" />
                    </Label>
                    <p className="text-xs text-gray-500 mb-3">
                        <span>By continuing, you agree to the </span>
                        <Link className="text-gray-600 underline" href="/">
                            Terms of Use
                        </Link>
                        <span> and </span>
                        <Link className="text-gray-600 underline" href="/">
                            Privacy Policy
                        </Link>
                        <span>.</span>
                    </p>
                    <Button fullWidth>Log In</Button>
                </form>
                <Link className="text-xs text-gray-600 underline block mt-3" href="/">
                    Forget your password?
                </Link>
            </div>
        </div>
    )
}

export default Login
