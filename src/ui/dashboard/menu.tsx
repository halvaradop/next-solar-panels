import Link from "next/link"

export const Menu = () => {
    return (
        <aside className="hidden base:self-start base:w-[20vw] base:h-min base:my-4 base:max-w-52 base:block base:py-6 base:px-4 base:border base:border-gray-1000 base:rounded-lg base:bg-white">
            <ul className="text-neutral-600 space-y-1">
                <li className="text-neutral-800 font-medium">Samples</li>
                <li className="ml-4">
                    <Link href="/dashboard">Dashboard</Link>
                </li>
                <li className="ml-4">
                    <Link href="/dashboard/add">Add</Link>
                </li>
            </ul>
        </aside>
    )
}
