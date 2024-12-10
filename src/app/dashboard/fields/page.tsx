import { Metadata } from "next"
import { Suspense } from "react"
import { auth } from "@/lib/auth"
import { TableFields } from "@/ui/dashboard/fields/table"
import { getContactPersonById, getProjectsByStakeHolderId, getFieldsByStakeHolderId } from "@/lib/services"
import { Filter } from "@/ui/common/filter"

export const metadata: Metadata = {
    title: "Fields",
    description: "List of Fields",
}

const getInformation = async () => {
    const session = await auth()
    const userId = session?.user?.id ? session.user.id : Number.MAX_SAFE_INTEGER.toString()
    const {
        stakeHolder: [{ idStakeHolder } = { idStakeHolder: "" }],
    } = await getContactPersonById(userId)
    const [fields, projects] = await Promise.all([
        getFieldsByStakeHolderId(idStakeHolder),
        getProjectsByStakeHolderId(idStakeHolder),
    ])
    return { fields, projects }
}

const DashboardFieldsPage = async () => {
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
                <TableFields fields={fields} />
            </Suspense>
        </section>
    )
}

export default DashboardFieldsPage
