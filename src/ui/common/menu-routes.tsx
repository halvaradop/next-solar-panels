import Link from "next/link"
import { MenuRoutesProps } from "@/lib/@types/props"
import { roleBasedAccessControl } from "@/middleware"
import { headerMenuListVariants } from "@/ui/motion/header-menu.motion"
import * as motion from "framer-motion/client"
import { merge } from "@halvaradop/ui-core"

const links = [
    {
        title: "Projects",
        link: "/dashboard/projects",
    },
    {
        title: "Client Data",
        link: "/dashboard/client-data",
    },
    {
        title: "Settings",
        link: "/dashboard/settings",
    },
    {
        title: "Help",
        link: "/dashboard/help",
    },
    {
        title: "Contact experts",
        link: "/dashboard/contact-people",
    },
]

export const MenuRoutes = ({ className, classNameTitle, classNameOption, session }: MenuRoutesProps) => {
    if (!session) return null
    const {
        user: { role },
    } = session
    const rbac = roleBasedAccessControl[role] ?? []

    return (
        <motion.ul className={merge("w-full", className)} variants={headerMenuListVariants}>
            <li
                className={merge(
                    "w-full p-2 font-medium border border-transparent rounded hocus:text-white hocus:border-sky-500 hocus:cursor-pointer hocus:bg-sky-500 focus-visible:outline-none",
                    classNameTitle
                )}
                tabIndex={0}
            >
                <Link href="/dashboard" tabIndex={-1}>
                    Overview
                </Link>
            </li>
            {links.map(({ title, link }, key) => {
                const pathname = link.replace(/^\/dashboard\/?/, "")
                if (!rbac.includes(pathname)) return null
                return (
                    <li
                        className={merge(
                            "w-full p-2 border border-transparent rounded hocus:text-white hocus:border-sky-500 hocus:cursor-pointer hocus:bg-sky-500 focus-visible:outline-none",
                            classNameOption
                        )}
                        tabIndex={0}
                        key={key}
                    >
                        <Link href={link} tabIndex={-1}>
                            {title}
                        </Link>
                    </li>
                )
            })}
        </motion.ul>
    )
}
