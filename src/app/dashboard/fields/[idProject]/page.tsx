import { Metadata } from "next"
import { Suspense } from "react"
import { auth } from "@/lib/auth"
import { TableFields } from "@/ui/dashboard/fields/table"
import { getFieldsByProjectsId, getProjectsById } from "@/lib/services"
import { Params } from "@/lib/@types/types"
import { SessionProvider } from "next-auth/react"
import { AddNewField } from "@/ui/dashboard/fields/add-new-field"

export const metadata: Metadata = {
    title: "Fields",
    description: "List of Fields",
}

const getInformation = async (idProject: string) => {
    const session = await auth()
    const userId = session?.user?.id ? session.user.id : Number.MAX_SAFE_INTEGER.toString()

    /** const {
        stakeHolder: [{ idStakeHolder } = { idStakeHolder: "" }],
    } = await getContactPersonById(userId)*/
    const [fields, projects] = await Promise.all([getFieldsByProjectsId(idProject), getProjectsById(idProject)])
    return { fields, projects }
}

const DashboardFieldsPage = async ({ params }: Params<"idProject">) => {
    const idProject = (await params).idProject
    const { fields, projects } = await getInformation(idProject)

    return (
        <section className="min-h-main py-4 space-y-4">
            {/* <Filter
                filters={[
                    {
                        title: "Projects",
                        options: projects.map(({ idProject, designation }) => ({
                            key: designation,
                            value: idProject.toString(),
                        })),
                    },
                ]}
            /> */}
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
