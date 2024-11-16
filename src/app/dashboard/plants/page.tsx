import { Suspense } from "react"
import { auth } from "@/lib/auth"
import { getPlantsByCompanyId, getUserById } from "@/lib/services"
import { TablePlants } from "@/ui/dashboard/plants/table"

const getInformation = async () => {
    const session = await auth()
    const userId = session?.user?.id ? Number(session.user.id) : Number.MAX_SAFE_INTEGER
    const { companyId } = await getUserById(userId)
    const plants = await getPlantsByCompanyId(companyId)
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
