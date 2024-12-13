import { Metadata } from "next"
import { Suspense } from "react"
import { auth } from "@/lib/auth"
import { getProjectsByStakeHolderId, getContactPersonById, getPositionSoilDataByContactPerson } from "@/lib/services"
import { TableProjects } from "@/ui/dashboard/projects/table"
import { AddNewProject } from "@/ui/dashboard/projects/add-new-project"
import { getCookieToken } from "@/lib/services/cookies"
import { redirect } from "next/navigation"
import { TableCompiledSamples } from "@/ui/dashboard/samples/table-compiled"
import { compiledSample } from "@/lib/utils"

export const metadata: Metadata = {
    title: "Projects",
    description: "List of Projects",
}

const getInformation = async () => {
    const session = await auth()
    const userId = session?.user?.id ? session.user.id : Number.MAX_SAFE_INTEGER.toString()

    const {
        stakeHolder: [{ idStakeHolder } = { idStakeHolder: "" }],
    } = await getContactPersonById(userId)
    const [projects] = await Promise.all([getProjectsByStakeHolderId(idStakeHolder)])

    return { projects }
}

const DashboardPlantsPage = async () => {
    const { projects } = await getInformation()
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
