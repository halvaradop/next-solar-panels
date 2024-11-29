import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import { motion } from "framer-motion"
import { Button } from "@halvaradop/ui-button"
import { MenuRoutes } from "@/ui/common/menu-routes"
import { headerMenuListVariants, headerMenuVariants } from "@/ui/motion/header-menu.motion"
import { Avatar } from "./avatar"
import { HeaderMenuProps } from "@/lib/@types/props"

export const HeaderMenu = ({ onCloseMenu }: HeaderMenuProps) => {
    const session = useSession()
    const pathname = usePathname()
    const withinDashboard = new RegExp("^/dashboard.*$").test(pathname)
    const isLoggin = withinDashboard && session

    return (
        <motion.aside
            className="[--nav-menu:100%] base:w-auto base:min-h-fit base:max-w-none base:relative base:overflow-hidden base:bg-transparent base:[--nav-menu:0%]"
            variants={headerMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <div className="min-h-dvh p-10 flex flex-col justify-evenly base:min-h-fit base:p-0" id="aside-menu">
                <p className="pt-12 pb-1 text-2xl border-b border-gray base:hidden">Navigation</p>
                <ul className="mt-12 mb-16 font-medium flex items-start flex-col gap-y-6 base:m-0 base:items-center base:flex-row base:gap-x-8 base:uppercase">
                    {isLoggin && (
                        <>
                            <Link className="text-xl base:hidden" href="/dashboard">
                                Dashboard
                            </Link>
                            <MenuRoutes className="ml-2 space-y-1 base:hidden" />
                            <Avatar />
                        </>
                    )}
                    <motion.li
                        className="min-w-fit home-link my-2 text-3xl [--nav-li:100%] base:text-lg base:[--nav-li:0%]"
                        variants={headerMenuListVariants}
                        onClick={onCloseMenu}
                    >
                        <Link href="/">Home</Link>
                    </motion.li>
                    <motion.li
                        className="min-w-fit home-link my-2 text-3xl [--nav-li:100%] base:text-lg base:[--nav-li:0%]"
                        variants={headerMenuListVariants}
                        onClick={onCloseMenu}
                    >
                        <Link href="/#corrosion">Corrosion</Link>
                    </motion.li>
                    <motion.li
                        className="min-w-fit home-link my-2 text-3xl [--nav-li:100%] base:text-lg base:[--nav-li:0%]"
                        variants={headerMenuListVariants}
                        onClick={onCloseMenu}
                    >
                        <Link href="/#about-us">About us</Link>
                    </motion.li>
                    <motion.li
                        className="min-w-fit home-link my-2 text-3xl [--nav-li:100%] base:text-lg base:[--nav-li:0%]"
                        variants={headerMenuListVariants}
                        onClick={onCloseMenu}
                    >
                        <Link href="/imprint">Imprint</Link>
                    </motion.li>
                    <motion.li
                        className="w-full home-link my-2 [--nav-li:100%] base:[--nav-li:0%]"
                        variants={headerMenuListVariants}
                        onClick={onCloseMenu}
                    >
                        <Button className="w-full border-white base:px-4 base:text-lg base:border-transparent" asChild>
                            <Link href="/dashboard">Login</Link>
                        </Button>
                    </motion.li>
                </ul>
            </div>
        </motion.aside>
    )
}
