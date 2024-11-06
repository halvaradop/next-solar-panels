import { Button } from "@halvaradop/ui-button"
import { signOut, useSession } from "next-auth/react"

export const Loggin = () => {
    const { data: session } = useSession()
    if (!session) return null

    return (
        <div className="flex items-center justify-end gap-x-5">
            <div className="flex items-center gap-x-5">
                <div className="size-10 rounded-full bg-slate-100"></div>
                <div className="text-end">
                    <p className="font-medium">{session.user?.name}</p>
                    <p className="text-xs text-neutral-500">{session.user?.role ?? "Employee"}</p>
                </div>
            </div>
            <Button onClick={() => signOut({ redirectTo: "/" })}>Log out</Button>
        </div>
    )
}
