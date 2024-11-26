import { Metadata } from "next"
import { Suspense } from "react"
import { auth } from "@/lib/auth"
import { getProjectsByClientId, getUserById } from "@/lib/services"
import { TablePlants } from "@/ui/dashboard/projects/table"

export const metadata: Metadata = {
    title: "Plants",
    description: "List of plants",
}

const getInformation = async () => {
    const session = await auth()
    const userId = session?.user?.id ? session.user.id : Number.MAX_SAFE_INTEGER.toString()
    const {
        clients: [{ clientId } = { clientId: "" }],
    } = await getUserById(userId)
    const plants = await getProjectsByClientId(clientId)
    return { plants }
}

const DashboardPlantsPage = async () => {
    const { plants } = await getInformation()

    return (
        <section className="min-h-main py-4 space-y-4">
            <Suspense fallback={<p>Table...</p>}>
                <TablePlants plants={plants} />
            </Suspense>
        </section>
    )
}

export default DashboardPlantsPage
