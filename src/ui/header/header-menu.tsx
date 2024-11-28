import Link from "next/link"
import { motion } from "framer-motion"
import { useSession } from "next-auth/react"
import { Button } from "@halvaradop/ui-button"
import { headerMenuListVariants, headerMenuVariants } from "@/ui/motion/header-menu.motion"
import { Loggin } from "./loggin"
import { MenuRoutes } from "@/ui/common/menu-routes"

export const HeaderMenu = () => {
    const session = useSession()
    const isLoggin = new RegExp("^/dashboard.*$").test("") && session

    return (
        <motion.aside
            className="w-1/2 h-auto min-w-72 max-w-md absolute inset-y-0 right-0 z-10 bg-black [--nav-menu:100%] base:w-auto base:max-w-none base:relative base:bg-transparent base:[--nav-menu:0%]"
            variants={headerMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <div className="min-h-dvh p-10 flex flex-col justify-evenly base:min-h-min base:p-0">
                <p className="pb-1 border-b border-gray base:hidden">Navigation</p>
                {isLoggin ? (
                    <Loggin />
                ) : (
                    <ul className="font-medium flex items-start flex-col gap-8 base:items-center base:flex-row base:uppercase">
                        {isLoggin ? (
                            <aside className="mt-10 space-y-4">
                                <MenuRoutes className="text-gray-100" />
                            </aside>
                        ) : (
                            <>
                                <motion.li className="[--nav-li:100%] base:[--nav-li:0%]" variants={headerMenuListVariants}>
                                    <Link href="/">Home</Link>
                                </motion.li>
                                <motion.li className="[--nav-li:100%] base:[--nav-li:0%]" variants={headerMenuListVariants}>
                                    <Link href="/#corrosion">Corrosion</Link>
                                </motion.li>
                                <motion.li className="[--nav-li:100%] base:[--nav-li:0%]" variants={headerMenuListVariants}>
                                    <Link href="/#about-us">About us</Link>
                                </motion.li>
                                <motion.li className="[--nav-li:100%] base:[--nav-li:0%]" variants={headerMenuListVariants}>
                                    <Link href="/imprint">Imprint</Link>
                                </motion.li>
                            </>
                        )}
                        <li className="[--nav-li:100%] base:[--nav-li:0%]">
                            <Button className="px-8" asChild>
                                <Link href={isLoggin ? "/" : "/dashboard"}>{isLoggin ? "Log out" : "Login"}</Link>
                            </Button>
                        </li>
                    </ul>
                )}
            </div>
        </motion.aside>
    )
}
