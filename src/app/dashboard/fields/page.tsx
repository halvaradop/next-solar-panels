import { Metadata } from "next"
import { Suspense } from "react"
import { auth } from "@/lib/auth"
import { TableFields } from "@/ui/dashboard/fields/table"
import { getContactPersonById, getProjectsByStakeHolderId, getFieldsByStakeHolderId } from "@/lib/services"
import { Filter } from "@/ui/common/filter"
import { SessionProvider } from "next-auth/react"
import { AddNewField } from "@/ui/dashboard/fields/add-new-field"

export const metadata: Metadata = {
    title: "Fields",
    description: "List of Fields",
}

const getInformation = async () => {
    const session = await auth()
    const userId = session?.user?.id ? session.user.id : Number.MAX_SAFE_INTEGER.toString()
    /*TODO : fix stakeholderid
    const {
        stakeHolders: [{ stakeHolders } = { stakeHolders: "" }],
    } = await getContactPersonById(userId)*/
    const [fields, projects] = await Promise.all([
        getFieldsByStakeHolderId("stakeHolders"),
        getProjectsByStakeHolderId("stakeHolders"),
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
            <SessionProvider>
                <AddNewField />
            </SessionProvider>
            <Suspense fallback={<p>Table...</p>}>
                <TableFields fields={fields} />
            </Suspense>
        </section>
    )
}

export default DashboardFieldsPage
