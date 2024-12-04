import { Metadata } from "next"
import { Suspense } from "react"
import { auth } from "@/lib/auth"
import { SampleList } from "@/ui/dashboard/samples/sample-list"
import { Filter } from "@/ui/common/filter"
import { getSamplesByUser, getUserById, getZonesByClientId } from "@/lib/services"
import { evalutionGrosor } from "@/lib/utils"
import DowloandBotton from "@/ui/dashboard/pdf/page"

export const metadata: Metadata = {
    title: "List of samples",
    description: "List of samples in the dashboard",
}

const getInformation = async () => {
    const session = await auth()
    const userId = session?.user?.id ? session.user.id : Number.MAX_SAFE_INTEGER.toString()
    const {
        clients: [{ clientId } = { clientId: "" }],
    } = await getUserById(userId)
    const [zones, samples] = await Promise.all([getZonesByClientId(clientId), getSamplesByUser(userId.toString())])
    return { zones, samples }
}

const DashboardSamplesPage = async () => {
    const { zones, samples } = await getInformation()
    return (
        <section className="min-h-main py-4 space-y-4">
            <Filter
                filters={[
                    {
                        title: "Zone",
                        options: zones.map(({ zoneId, name }) => ({ key: name, value: zoneId.toString() })),
                    },
                ]}
            />
            <Suspense fallback={<p>Table...</p>}>
                <SampleList samples={samples} />
            </Suspense>
        </section>
    )
}

export default DashboardSamplesPage
