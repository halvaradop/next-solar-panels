import { Metadata } from "next"
import { Suspense } from "react"
import { auth } from "@/lib/auth"
import { TableZones } from "@/ui/dashboard/zones/table"
import { getUserById, getProjectsByStakeHolderId, getFieldsByStakeHolderId } from "@/lib/services"
import { Filter } from "@/ui/common/filter"

export const metadata: Metadata = {
    title: "Fields",
    description: "List of Fields",
}

const getInformation = async () => {
    const session = await auth()
    const userId = session?.user?.id ? session.user.id : Number.MAX_SAFE_INTEGER.toString()
    const {
        stakeHolders: [{ stakeHolders } = { stakeHolders: "" }],
    } = await getUserById(userId)
    const [fields, projects] = await Promise.all([
        getFieldsByStakeHolderId(stakeHolders),
        getProjectsByStakeHolderId(stakeHolders),
    ])
    return { fields, projects }
}

const DashboardZonesPage = async () => {
    const { fields, projects } = await getInformation()

    return (
        <section className="min-h-main py-4 space-y-4">
            <Filter
                filters={[
                    {
                        title: "Projects",
                        options: projects.map(({ idProject, designation }) => ({
                            key: designation,
                            value: idProject.toString(),
                        })),
                    },
                ]}
            />
            <Suspense fallback={<p>Table...</p>}>
                <TableZones zones={fields} />
            </Suspense>
        </section>
    )
}

export default DashboardZonesPage
