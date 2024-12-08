import { Metadata } from "next"
import { Suspense } from "react"
import { auth } from "@/lib/auth"
import { getProjectsByStakeHolderId, getUserById } from "@/lib/services"
import { TablePlants } from "@/ui/dashboard/projects/table"

export const metadata: Metadata = {
    title: "Projects",
    description: "List of Projects",
}

const getInformation = async () => {
    const session = await auth()
    const userId = session?.user?.id ? session.user.id : Number.MAX_SAFE_INTEGER.toString()
    const {
        stakeHolders: [{ stakeHolderId } = { stakeHolderId: "" }],
    } = await getUserById(userId)
    const projects = await getProjectsByStakeHolderId(stakeHolderId)
    return { projects }
}

const DashboardPlantsPage = async () => {
    const { projects } = await getInformation()

    return (
        <section className="min-h-main py-4 space-y-4">
            <Suspense fallback={<p>Table...</p>}>
                <TablePlants plants={projects} />
            </Suspense>
        </section>
    )
}

export default DashboardPlantsPage
