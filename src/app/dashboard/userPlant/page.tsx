import { Suspense } from "react"
import { auth } from "@/lib/auth"
import { getUserPlantByCompany } from "@/lib/services"
import { TableUserPlants } from "@/ui/dashboard/usersPlants/table"

const DashboardUserPlantsPage = async () => {
    const session = await auth()
    const userId = session?.user?.id ? Number(session.user.id) : Number.MAX_SAFE_INTEGER
    const plants = await getUserPlantByCompany(userId)

    return (
        <section className="min-h-main py-4 space-y-4">
            <Suspense fallback={<p>Table...</p>}>
                <TableUserPlants userPlants={plants} />
            </Suspense>
        </section>
    )
}

export default DashboardUserPlantsPage
