import { useSession } from "next-auth/react"

export const Loggin = () => {
    const { data: session } = useSession()
    if (!session) return null

    return (
        <div className="flex items-center justify-end gap-x-5">
            <div className="size-10 rounded-full bg-slate-100"></div>
            <div>
                <p className="font-medium">{session.user.name}</p>
                <p className="text-xs text-neutral-500">{session.user.role ?? "Employee"}</p>
            </div>
        </div>
    )
}
