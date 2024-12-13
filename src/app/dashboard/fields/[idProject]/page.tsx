import { Metadata } from "next"
import { Suspense } from "react"
import { TableFields } from "@/ui/dashboard/fields/table"
import { getFieldsByProjectsId } from "@/lib/services"
import { Params } from "@/lib/@types/types"
import { AddNewField } from "@/ui/dashboard/fields/add-new-field"

export const metadata: Metadata = {
    title: "Fields",
    description: "List of Fields",
}

const getInformation = async (idProject: string) => {
    const [fields] = await Promise.all([getFieldsByProjectsId(idProject)])
    return { fields }
}

const DashboardFieldsPage = async ({ params }: Params<"idProject">) => {
    const idProject = (await params).idProject
    const { fields } = await getInformation(idProject)

    return (
        <section className="min-h-main py-4 space-y-4">
            <AddNewField />
            <Suspense fallback={<p>Table...</p>}>
                <TableFields fields={fields} />
            </Suspense>
        </section>
    )
}

export default DashboardFieldsPage
