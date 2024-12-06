import Link from "next/link"
import { camelCaseToHyphenCamel, camelCaseToWords, merge } from "@/lib/utils"
import { MenuRoutesProps } from "@/lib/@types/props"
import { roleBasedAccessControl } from "@/middleware"

const links = {
    projects: [
        { href: "/dashboard/projects", label: "List" },
        { href: "/dashboard/projects/add", label: "Add" },
    ],
    clients: [
        { href: "/dashboard/clients", label: "List" },
        { href: "/dashboard/clients/add", label: "Add" },
    ],
    users: [
        { href: "/dashboard/users", label: "List" },
        { href: "/dashboard/users/add", label: "Add" },
    ],
    usersOnProjects: [
        { href: "/dashboard/users-on-projects", label: "List" },
        { href: "/dashboard/users-on-projects/add", label: "Add" },
    ],
    samples: [
        { href: "/dashboard/samples", label: "List" },
        { href: "/dashboard/samples/add", label: "Add" },
    ],
    zones: [
        { href: "/dashboard/zones", label: "List" },
        { href: "/dashboard/zones/add", label: "Add" },
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
            <ul className={merge("space-y-1", className)} key={key}>
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
            </ul>
        )
    })
}
