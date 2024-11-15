import { Suspense } from "react"
import { auth } from "@/lib/auth"
import { TableZones } from "@/ui/dashboard/zones/table"
import { getUserById, getPlantsByCompanyId, getZonesByCompanyId } from "@/lib/services"
import { Filter } from "@/ui/common/filter"

const getInformation = async () => {
    const session = await auth()
    const userId = session?.user?.id ? Number(session.user.id) : Number.MAX_SAFE_INTEGER
    const { companyId } = await getUserById(userId)
    const [zones, plants] = await Promise.all([getZonesByCompanyId(companyId), getPlantsByCompanyId(companyId)])
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
                        options: plants.map(({ plantId, plantName }) => ({ key: plantName, value: plantId.toString() })),
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
