import Link from "next/link"
import { MenuRoutes } from "@/ui/common/menu-routes"
import { auth } from "@/lib/auth"

export const Menu = async () => {
    const session = await auth()

    return (
        <aside className="hidden self-start w-full min-w-60 max-w-64 h-min max-h-[calc(100dvh-5rem-24px)] my-4 py-6 px-4 space-y-2 border border-gray-1000 rounded-lg overflow-y-auto bg-white scroll:w-2 track:my-2 thumb:rounded thumb:bg-black base:block">
            <MenuRoutes className="text-neutral-500" session={session} />
        </aside>
    )
}
