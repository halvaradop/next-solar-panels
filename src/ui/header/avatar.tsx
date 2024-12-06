import { Button } from "@halvaradop/ui-button"
import { signOut, useSession } from "next-auth/react"

export const Avatar = () => {
    const { data: session } = useSession()
    if (!session) return null
    const {
        user: { firstName, lastName },
    } = session

    return (
        <div className="w-full flex items-center justify-end gap-x-5">
            <div className="w-max hidden items-center gap-x-5 base:flex">
                <div className="size-10 rounded-full bg-slate-100"></div>
                <div className="text-end">
                    <p className="text-black font-medium">
                        {firstName} {lastName}
                    </p>
                </div>
            </div>
            <Button className="w-full mt-4 border-white base:m-0" onClick={() => signOut({ redirectTo: "/" })}>
                Log out
            </Button>
        </div>
    )
}
