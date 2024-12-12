import { Metadata } from "next"
import { Suspense } from "react"
import { auth } from "@/lib/auth"
import { TableFields } from "@/ui/dashboard/fields/table"
import { getContactPersonById, getFieldsByProjectsId, getFieldsByStakeHolderId, getProjectsById } from "@/lib/services"
import { Filter } from "@/ui/common/filter"
import { SessionProvider } from "next-auth/react"
import { AddNewField } from "@/ui/dashboard/fields/add-new-field"
import { FieldsPageProps } from "@/lib/@types/props"

export const metadata: Metadata = {
    title: "Fields",
    description: "List of Fields",
}

const getInformation = async (idProject: string) => {
    const session = await auth()
    const userId = session?.user?.id ? session.user.id : Number.MAX_SAFE_INTEGER.toString()

    const {
        stakeHolder: [{ idStakeHolder } = { idStakeHolder: "" }],
    } = await getContactPersonById(userId)
    const [fields, projects] = await Promise.all([getFieldsByProjectsId(idProject), getProjectsById(idProject)])
    return { fields, projects }
}

const DashboardFieldsPage = async ({ params }: { params: { idProject: string } }) => {
    const { idProject } = params
    const { fields, projects } = await getInformation(idProject)

    return (
        <section className="min-h-main py-4 space-y-4">
            {/*     <Filter
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
            </SessionProvider>*/}

            <Suspense fallback={<p>Table...</p>}>
                <TableFields fields={fields} />
            </Suspense>
        </section>
    )
}

export default DashboardFieldsPage
