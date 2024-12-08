import { Metadata } from "next"
import { Suspense } from "react"
import { getStakeHolder } from "@/lib/services"
import { TableStakeHolder } from "@/ui/dashboard/clients/table"
import { TableStakeHoldersProps } from "@/lib/@types/props"
import { auth } from "@/lib/auth"

export const metadata: Metadata = {
    title: "Stake Holders",
    description: "List of Stake Holders",
}

const DashboardStakeHolderPage = async () => {
    const session = await auth()
    const stakeHolders = await getStakeHolder<TableStakeHoldersProps["stakeHolders"]>()

    return (
        <section className="min-h-main py-4 space-y-4">
            <Suspense fallback={<p>Table...</p>}>
                <TableStakeHolder stakeHolders={stakeHolders} />
            </Suspense>
        </section>
    )
}

export default DashboardStakeHolderPage
