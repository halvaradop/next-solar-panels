import { Suspense } from "react"
import { auth } from "@/lib/auth"
import { getProjectsByClientId, getUserById } from "@/lib/services"
import { TablePlants } from "@/ui/dashboard/projects/table"

const getInformation = async () => {
    const session = await auth()
    const userId = session?.user?.id ? session.user.id : Number.MAX_SAFE_INTEGER.toString()
    const { projectsOnUsers } = await getUserById(userId)
    const clientId = projectsOnUsers[0]?.project.clients.clientId
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
