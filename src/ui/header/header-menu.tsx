import Link from "next/link"
import { motion } from "framer-motion"
import { headerMenuListVariants, headerMenuVariants } from "@/ui/motion/header-menu.motion"

export const HeaderMenu = () => {
    return (
        <motion.aside
            className="w-1/2 max-w-md absolute inset-y-0 right-0 bg-black base:w-auto base:max-w-none base:relative base:bg-transparent [--nav-menu:100%] base:[--nav-menu:0%]"
            variants={headerMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <div className="min-h-dvh p-10 flex flex-col justify-evenly text-white base:min-h-min base:p-0">
                <p className="pb-1 border-b border-gray base:hidden">Navigation</p>
                <ul className="fluency-3xl font-medium flex flex-col gap-8 base:flex-row base:text-lg base:uppercase">
                    <motion.li className="[--nav-li:100%] base:[--nav-li:0%]" variants={headerMenuListVariants}>
                        <Link href="/">Home</Link>
                    </motion.li>
                    <motion.li className="[--nav-li:100%] base:[--nav-li:0%]" variants={headerMenuListVariants}>
                        <Link href="/">Corrosion</Link>
                    </motion.li>
                    <motion.li className="[--nav-li:100%] base:[--nav-li:0%]" variants={headerMenuListVariants}>
                        <Link href="/">Solar panels</Link>
                    </motion.li>
                    <motion.li className="[--nav-li:100%] base:[--nav-li:0%]" variants={headerMenuListVariants}>
                        <Link href="/">About us</Link>
                    </motion.li>
                </ul>
            </div>
        </motion.aside>
    )
}
