import { Metadata } from "next"
import { Suspense } from "react"
import { getStakeholder } from "@/lib/services"
import { TableStakeHolder } from "@/ui/dashboard/stake-holders/table"
import { TableStakeHoldersProps } from "@/lib/@types/props"
import { auth } from "@/lib/auth"
import { SessionProvider } from "next-auth/react"
import { AddNewStakeHolder } from "@/ui/dashboard/stake-holders/add-new-stake-holder"

export const metadata: Metadata = {
    title: "Stake Holders",
    description: "List of Stake Holders",
}

const DashboardStakeHolderPage = async () => {
    const session = await auth()
    const stakeHolders = await getStakeholder<TableStakeHoldersProps["stakeHolders"]>()

    return (
        <section className="min-h-main py-4 space-y-4">
            <SessionProvider>
                <AddNewStakeHolder />
            </SessionProvider>
            <Suspense fallback={<p>Table...</p>}>
                <TableStakeHolder stakeHolders={stakeHolders} />
            </Suspense>
        </section>
    )
}

export default DashboardStakeHolderPage
