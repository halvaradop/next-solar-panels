import Link from "next/link"
import { motion } from "framer-motion"
import { useSession } from "next-auth/react"
import { Button } from "@halvaradop/ui-button"
import { HeaderMenuProps } from "@/lib/@types/props"
import { headerMenuListVariants, headerMenuVariants } from "@/ui/motion/header-menu.motion"
import { Loggin } from "./loggin"

export const HeaderMenu = ({ pathname, menuState, setMenuState }: HeaderMenuProps) => {
    const session = useSession()
    const isLoggin = new RegExp("^/dashboard.*$").test(pathname) && session

    const handleHashChange = () => {
        setMenuState((previous) => ({
            ...previous,
            isMenuOpen: false,
        }))
    }

    return (
        <motion.aside
            className="w-1/2 min-w-72 max-w-md absolute inset-y-0 right-0 z-10 bg-black [--nav-menu:100%] base:w-auto base:max-w-none base:relative base:bg-transparent base:[--nav-menu:0%]"
            variants={headerMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <div className="min-h-dvh p-10 flex flex-col justify-evenly base:min-h-min base:p-0">
                <p className="pb-1 border-b border-gray base:hidden">Navigation</p>
                {isLoggin && menuState.isMatchMedia ? (
                    <Loggin />
                ) : (
                    <ul className="fluency-3xl font-medium flex items-start flex-col gap-8 base:items-center base:flex-row base:text-lg base:uppercase">
                        {isLoggin ? (
                            <>
                                <motion.li className="[--nav-li:100%] base:[--nav-li:0%]" variants={headerMenuListVariants}>
                                    <Link href="/dashboard">Dashboard</Link>
                                </motion.li>
                                <motion.li className="[--nav-li:100%] base:[--nav-li:0%]" variants={headerMenuListVariants}>
                                    <Link href="/dashboard/samples">List</Link>
                                </motion.li>
                                <motion.li className="[--nav-li:100%] base:[--nav-li:0%]" variants={headerMenuListVariants}>
                                    <Link href="/dashboard/samples/add">Add</Link>
                                </motion.li>
                            </>
                        ) : (
                            <>
                                <motion.li className="[--nav-li:100%] base:[--nav-li:0%]" variants={headerMenuListVariants}>
                                    <Link href="/">Home</Link>
                                </motion.li>
                                <motion.li className="[--nav-li:100%] base:[--nav-li:0%]" variants={headerMenuListVariants}>
                                    <Link href="/#corrosion" onClick={() => handleHashChange()}>
                                        Corrosion
                                    </Link>
                                </motion.li>
                                <motion.li className="[--nav-li:100%] base:[--nav-li:0%]" variants={headerMenuListVariants}>
                                    <Link href="/#solar-panels" onClick={() => handleHashChange()}>
                                        Solar panels
                                    </Link>
                                </motion.li>
                                <motion.li className="[--nav-li:100%] base:[--nav-li:0%]" variants={headerMenuListVariants}>
                                    <Link href="/#about-us" onClick={() => handleHashChange()}>
                                        About us
                                    </Link>
                                </motion.li>
                            </>
                        )}
                        <motion.li className="[--nav-li:100%] base:[--nav-li:0%]" variants={headerMenuListVariants}>
                            <Button asChild>
                                <Link href={isLoggin ? "/" : "/dashboard"}>{isLoggin ? "Log out" : "Login"}</Link>
                            </Button>
                        </motion.li>
                    </ul>
                )}
            </div>
        </motion.aside>
    )
}
