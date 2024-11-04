import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@halvaradop/ui-button"
import { headerMenuListVariants, headerMenuVariants } from "@/ui/motion/header-menu.motion"
import { HeaderMenuProps } from "@/lib/@types/props"
import { Loggin } from "./loggin"

export const HeaderMenu = ({ isMatchMedia }: HeaderMenuProps) => {
    /**
     * Get the current pathname and simulate if the user is logged in
     * TODO: Remove this when will be implemented next-auth
     */
    const patname = usePathname()
    const isLogged = ["/dashboard", "/dashboard/add"].includes(patname)

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
                {isLogged && isMatchMedia ? (
                    <Loggin />
                ) : (
                    <ul className="fluency-3xl font-medium flex items-start flex-col gap-8 base:items-center base:flex-row base:text-lg base:uppercase">
                        {isLogged ? (
                            <>
                                <motion.li className="[--nav-li:100%] base:[--nav-li:0%]" variants={headerMenuListVariants}>
                                    <Link href="/dashboard">Dashboard</Link>
                                </motion.li>
                                <motion.li className="[--nav-li:100%] base:[--nav-li:0%]" variants={headerMenuListVariants}>
                                    <Link href="/dashboard/add">Add</Link>
                                </motion.li>
                            </>
                        ) : (
                            <>
                                <motion.li className="[--nav-li:100%] base:[--nav-li:0%]" variants={headerMenuListVariants}>
                                    <Link href="/">Home</Link>
                                </motion.li>
                                <motion.li className="[--nav-li:100%] base:[--nav-li:0%]" variants={headerMenuListVariants}>
                                    <Link href="/#corrosion">Corrosion</Link>
                                </motion.li>
                                <motion.li className="[--nav-li:100%] base:[--nav-li:0%]" variants={headerMenuListVariants}>
                                    <Link href="/#solar-panels">Solar panels</Link>
                                </motion.li>
                                <motion.li className="[--nav-li:100%] base:[--nav-li:0%]" variants={headerMenuListVariants}>
                                    <Link href="/#about-us">About us</Link>
                                </motion.li>
                            </>
                        )}
                        <motion.li className="[--nav-li:100%] base:[--nav-li:0%]" variants={headerMenuListVariants}>
                            <Button asChild>
                                <Link href={isLogged ? "/" : "/login"}>{isLogged ? "Log out" : "Login"}</Link>
                            </Button>
                        </motion.li>
                    </ul>
                )}
            </div>
        </motion.aside>
    )
}
