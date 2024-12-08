import { Metadata } from "next"
import { Suspense } from "react"
import { auth } from "@/lib/auth"
import { SampleList } from "@/ui/dashboard/samples/sample-list"
import { Filter } from "@/ui/common/filter"
import { getSamplesByUser, getUserById, getFieldsByStakeHolderId } from "@/lib/services"

export const metadata: Metadata = {
    title: "List of samples",
    description: "List of samples in the dashboard",
}

const getInformation = async () => {
    const session = await auth()
    const userId = session?.user?.id ? session.user.id : Number.MAX_SAFE_INTEGER.toString()
    const {
        stakeHolderId: [{ stakeHolderId } = { stakeHolderId: "" }],
    } = await getUserById(userId)
    const [fields, samples] = await Promise.all([getFieldsByStakeHolderId(stakeHolderId), getSamplesByUser(userId.toString())])
    return { fields, samples }
}

const DashboardSamplesPage = async () => {
    const { fields, samples } = await getInformation()
    return (
        <section className="min-h-main py-4 space-y-4">
            <Filter
                filters={[
                    {
                        title: "Zone",
                        options: fields.map(({ fieldId, state }) => ({ key: state, value: fieldId.toString() })),
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
