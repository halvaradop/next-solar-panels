import { Metadata } from "next"
import { Suspense } from "react"
import { auth } from "@/lib/auth"
import { TableZones } from "@/ui/dashboard/zones/table"
import { getUserById, getProjectsByClientId, getZonesByClientId } from "@/lib/services"
import { Filter } from "@/ui/common/filter"

export const metadata: Metadata = {
    title: "Zones",
    description: "List of zones",
}

const getInformation = async () => {
    const session = await auth()
    const userId = session?.user?.id ? session.user.id : Number.MAX_SAFE_INTEGER.toString()
    const { clientId } = await getUserById(userId)
    const [zones, plants] = await Promise.all([getZonesByClientId(clientId), getProjectsByClientId(clientId)])
    return { zones, plants }
}

const DashboardZonesPage = async () => {
    const { zones, plants } = await getInformation()

    return (
        <section className="min-h-main py-4 space-y-4">
            <Filter
                filters={[
                    {
                        title: "Plants",
                        options: plants.map(({ projectId, name }) => ({ key: name, value: projectId.toString() })),
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
