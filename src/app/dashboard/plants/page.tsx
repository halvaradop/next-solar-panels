import { Suspense } from "react"
import { auth } from "@/lib/auth"
import { getPlantByCompany } from "@/lib/services"
import { Table } from "@/ui/dashboard/plants/table"

const DashboardPlantsPage = async () => {
    const session = await auth()
    const userId = session?.user?.id ? Number(session.user.id) : Number.MAX_SAFE_INTEGER
    const plants = await getPlantByCompany(userId)
    return (
        <section className="min-h-main py-4 space-y-4">
            <Suspense fallback={<p>Table...</p>}>
                <Table plants={plants} />
            </Suspense>
        </section>
    )
}

export default DashboardPlantsPage
