import Link from "next/link"
import { CardDashboardProps } from "@/lib/@types/props"
import { merge } from "@/lib/utils"
import { Button } from "@halvaradop/ui-button"

export const CardDashboard = ({ title, count, href }: CardDashboardProps) => {
    return (
        <article className={merge("py-3 px-4 flex items-start justify-center flex-col shadow rounded-md bg-white")}>
            <h2 className="text-lg font-medium">{title}</h2>
            <p className="mb-2 text-sky-500 text-3xl font-bold">{count}</p>
            <Button
                className="font-normal border-slate-200 bg-slate-200 focus-visible:ring-slate-200 hover:border-slate-200"
                variant="outline"
                asChild
            >
                <Link href={href}>View More</Link>
            </Button>
        </article>
    )
}
