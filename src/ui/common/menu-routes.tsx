import Link from "next/link"
import { camelCaseToHyphenCamel, camelCaseToWords, merge } from "@/lib/utils"
import { MenuRoutesProps } from "@/lib/@types/props"
import { roleBasedAccessControl } from "@/middleware"
import { headerMenuListVariants } from "@/ui/motion/header-menu.motion"
import * as motion from "framer-motion/client"

const links = {
    projects: [
        { href: "/dashboard/projects", label: "List" },
        { href: "/dashboard/projects/add", label: "Add" },
    ],
    stakeHolders: [
        { href: "/dashboard/stake-holders", label: "List" },
        { href: "/dashboard/stake-holders/add", label: "Add" },
    ],
    contactPeople: [
        { href: "/dashboard/contactPeople", label: "List" },
        { href: "/dashboard/contactPeople/add", label: "Add" },
    ],
    fields: [
        { href: "/dashboard/fields", label: "List" },
        { href: "/dashboard/fields/add", label: "Add" },
    ],
    addresses: [
        { href: "/dashboard/addresses", label: "List" },
        { href: "/dashboard/addresses/add", label: "Add" },
    ],
    positionDatas: [
        { href: "/dashboard/position-datas", label: "List" },
        { href: "/dashboard/position-datas/add", label: "Add" },
    ],
    positionSoilDatas: [
        { href: "/dashboard/position-soil-datas", label: "List" },
        { href: "/dashboard/position-soil-datas/add", label: "Add" },
    ],
}

export const MenuRoutes = ({ className, classTitle, classOption, session }: MenuRoutesProps) => {
    if (!session) return null
    const {
        user: { role },
    } = session
    const rbac = roleBasedAccessControl["project-manager"] ?? []

    return Object.entries(links).map(([key, links]) => {
        if (!rbac.includes(camelCaseToHyphenCamel(key))) return null

        return (
            <motion.ul className={merge("space-y-1", className)} variants={headerMenuListVariants} key={key}>
                <li className={merge("font-medium capitalize", classTitle)}>{camelCaseToWords(key)}</li>
                {links.map(({ href, label }, key) => {
                    const pathname = href.replace(/^\/dashboard\/?/, "")
                    if (!rbac.includes(camelCaseToHyphenCamel(pathname)) && pathname !== "") return null
                    return (
                        <li className={merge("ml-3", classOption)} key={key}>
                            <Link href={href}>{label}</Link>
                        </li>
                    )
                })}
            </motion.ul>
        )
    })
}
