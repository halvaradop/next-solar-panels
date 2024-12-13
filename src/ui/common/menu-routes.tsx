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
    stakeHolder: [
        { href: "/dashboard/stakeHolders", label: "List" },
        { href: "/dashboard/stakeHolders/add", label: "Add" },
    ],
    contactPerson: [
        { href: "/dashboard/contactPersons", label: "List" },
        { href: "/dashboard/contactPersons/add", label: "Add" },
    ],
    usersOnProjects: [
        { href: "/dashboard/users-on-projects", label: "List" },
        { href: "/dashboard/users-on-projects/add", label: "Add" },
    ],
    samples: [
        { href: "/dashboard/samples", label: "List" },
        { href: "/dashboard/samples/add", label: "Add" },
    ],
    fields: [
        { href: "/dashboard/fields", label: "List" },
        { href: "/dashboard/fields/add", label: "Add" },
    ],
}

export const MenuRoutes = ({ className, classTitle, classOption, session }: MenuRoutesProps) => {
    if (!session) return null
    const {
        user: { role },
    } = session
    const rbac = roleBasedAccessControl[role] ?? []

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
