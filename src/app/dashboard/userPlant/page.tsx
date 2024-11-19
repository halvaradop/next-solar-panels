import { Suspense } from "react"
import { auth } from "@/lib/auth"
import { getUserProjectsByClients } from "@/lib/services"
import { TableUserPlants } from "@/ui/dashboard/usersPlants/table"

/**
 * TODO: fix table
 */
const DashboardUserPlantsPage = async () => {
    const session = await auth()
    const userId = session?.user?.id ? Number(session.user.id) : Number.MAX_SAFE_INTEGER
    const plants = await getUserProjectsByClients(userId)

    return (
        <section className="min-h-main py-4 space-y-4">
            <Suspense fallback={<p>Table...</p>}>
                <TableUserPlants userPlants={[]} />
            </Suspense>
        </section>
    )
}

export default DashboardUserPlantsPage
