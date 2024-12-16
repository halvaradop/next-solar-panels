import Link from "next/link"
import { CardDashboardProps } from "@/lib/@types/props"
import { merge } from "@/lib/utils"
import { Button } from "@halvaradop/ui-button"

export const CardDashboard = ({ title, count, href }: CardDashboardProps) => {
    return (
        <article
            className={merge("py-3 px-4 flex items-start justify-center flex-col border border-gray-1000 rounded-md bg-white")}
        >
            <h2 className="text-lg font-medium">{title}</h2>
            <p className="mb-2 text-3xl font-bold">{count}</p>
            <Button className="font-normal border-gray-1000 bg-slate-50 focus-visible:ring-gray-1000" variant="outline" asChild>
                <Link href={href}>View More</Link>
            </Button>
        </article>
    )
}
