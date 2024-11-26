import Link from "next/link"

import { MenuRoutes } from "@/ui/common/menu-routes"

export const Menu = () => {
    return (
        <aside className="hidden base:self-start base:w-[20vw] base:h-min base:my-4 base:max-w-52 base:block base:py-6 base:px-4 base:space-y-2 base:border base:border-gray-1000 base:rounded-lg base:bg-white">
            <h2 className="text-lg text-neutral-800 font-medium">
                <Link href="/dashboard">Dashboard</Link>
            </h2>
            <MenuRoutes className="text-neutral-500" classTitle="text-neutral-600" />
        </aside>
    )
}
