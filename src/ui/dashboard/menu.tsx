import Link from "next/link"

const links = {
    samples: [
        { href: "/dashboard/samples", label: "List" },
        { href: "/dashboard/samples/add", label: "Add" },
    ],
    zones: [
        { href: "/dashboard/zones", label: "List" },
        { href: "/dashboard/zones/add", label: "Add" },
    ],
}

export const Menu = () => {
    return (
        <aside className="hidden base:self-start base:w-[20vw] base:h-min base:my-4 base:max-w-52 base:block base:py-6 base:px-4 base:space-y-2 base:border base:border-gray-1000 base:rounded-lg base:bg-white">
            <h2 className="text-lg text-neutral-800 font-medium">
                <Link href="/dashboard">Dashboard</Link>
            </h2>
            {Object.entries(links).map(([key, links]) => (
                <ul className="text-neutral-500 space-y-1" key={key}>
                    <li className="text-neutral-600 font-medium capitalize">{key}</li>
                    {links.map(({ href, label }, key) => (
                        <li className="ml-3" key={key}>
                            <Link href={href}>{label}</Link>
                        </li>
                    ))}
                </ul>
            ))}
        </aside>
    )
}
