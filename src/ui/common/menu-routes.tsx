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
        title: "Stakeholders",
        link: "/dashboard/stake-holders",
    },
    {
        title: "Contact People",
        link: "/dashboard/contact-people",
    },
    {
        title: "Fields",
        link: "/dashboard/fields",
    },
    {
        title: "Addresses",
        link: "/dashboard/addresses",
    },
    {
        title: "Position Datas",
        link: "/dashboard/position-datas",
    },
    {
        title: "Position Soil Datas",
        link: "/dashboard/position-soil-datas",
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
                    "w-full p-2 font-medium border border-transparent rounded hover:text-white hover:border-sky-500 hover:cursor-pointer hover:bg-sky-500",
                    classNameTitle
                )}
            >
                <Link href="/dashboard">Overview</Link>
            </li>
            {links.map(({ title, link }, key) => {
                const pathname = link.replace(/^\/dashboard\/?/, "")
                if (!rbac.includes(pathname)) return null
                return (
                    <li
                        className={merge(
                            "w-full p-2 border border-transparent rounded hover:text-white hover:border-sky-500 hover:cursor-pointer hover:bg-sky-500",
                            classNameOption
                        )}
                        key={key}
                    >
                        <Link href={link}>{title}</Link>
                    </li>
                )
            })}
        </motion.ul>
    )
}
