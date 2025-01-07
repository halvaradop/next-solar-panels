import { Metadata } from "next"
import { Suspense } from "react"
import { getProjectsByStakeHolderId } from "@/lib/services"
import { TableProjects } from "@/ui/dashboard/projects/table"
import { AddNewProject } from "@/ui/dashboard/projects/add-new-project"
import { getSessionToken } from "@/lib/utils"

export const metadata: Metadata = {
    title: "Projects",
    description: "List of Projects",
}

const getInformation = async () => {
    const { idStakeHolder } = await getSessionToken()
    return await getProjectsByStakeHolderId(idStakeHolder)
}

const DashboardPlantsPage = async () => {
    const projects = await getInformation()
    return (
        <section className="min-h-main py-4 space-y-4">
            <AddNewProject />
            <Suspense fallback={<p>Table...</p>}>
                <TableProjects projects={projects} />
            </Suspense>
        </section>
    )
}

export default DashboardPlantsPage
