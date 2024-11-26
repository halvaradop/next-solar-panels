import Link from "next/link"
import { camelCaseToWords, merge } from "@/lib/utils"
import { MenuRoutesProps } from "@/lib/@types/props"

const links = {
    samples: [
        { href: "/dashboard/samples", label: "List" },
        { href: "/dashboard/samples/add", label: "Add" },
    ],
    zones: [
        { href: "/dashboard/zones", label: "List" },
        { href: "/dashboard/zones/add", label: "Add" },
    ],
    users: [
        { href: "/dashboard/users", label: "List" },
        { href: "/dashboard/users/add", label: "Add" },
    ],
    clients: [
        { href: "/dashboard/clients", label: "List" },
        { href: "/dashboard/clients/add", label: "Add" },
    ],
    plants: [
        { href: "/dashboard/plants", label: "List" },
        { href: "/dashboard/plants/add", label: "Add" },
    ],
    /*
    TODO: unstable
    userToProjects: [
        { href: "/dashboard/projects-on-users", label: "List" },
        { href: "/dashboard/projects-on-users/add", label: "Add" },
    ],
    */
}

export const MenuRoutes = ({ className, classTitle, classOption }: MenuRoutesProps) => {
    return Object.entries(links).map(([key, links]) => (
        <ul className={merge("space-y-1", className)} key={key}>
            <li className={merge("font-medium capitalize", classTitle)}>{camelCaseToWords(key)}</li>
            {links.map(({ href, label }, key) => (
                <li className={merge("ml-3", classOption)} key={key}>
                    <Link href={href}>{label}</Link>
                </li>
            ))}
        </ul>
    ))
}
