import { Suspense } from "react"
import { auth } from "@/lib/auth"
import { TableZones } from "@/ui/dashboard/zones/table"
import { getUserById, getProjectsByClientId, getZonesByClientId } from "@/lib/services"
import { Filter } from "@/ui/common/filter"

const getInformation = async () => {
    const session = await auth()
    const userId = session?.user?.id ? session.user.id : Number.MAX_SAFE_INTEGER.toString()
    const {
        clients: [{ clientId }],
    } = await getUserById(userId)
    const [zones, projects] = await Promise.all([getZonesByClientId(clientId), getProjectsByClientId(clientId)])
    return { zones, projects }
}

const DashboardZonesPage = async () => {
    const { zones, projects } = await getInformation()

    return (
        <section className="min-h-main py-4 space-y-4">
            <Filter
                filters={[
                    {
                        title: "Projects",
                        options: projects.map(({ projectId, name }) => ({ key: name, value: projectId.toString() })),
                    },
                ]}
            />
            <Suspense fallback={<p>Table...</p>}>
                <TableZones zones={zones} />
            </Suspense>
        </section>
    )
}

export default DashboardZonesPage
