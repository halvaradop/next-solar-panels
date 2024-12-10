import { Metadata } from "next"
import { Suspense } from "react"
import { auth } from "@/lib/auth"
import { getProjectsByStakeHolderId, getContactPersonById } from "@/lib/services"
import { TableProjects } from "@/ui/dashboard/projects/table"
import { AddNewProject } from "@/ui/dashboard/projects/add-new-project"
import { SessionProvider } from "next-auth/react"

export const metadata: Metadata = {
    title: "Projects",
    description: "List of Projects",
}

const getInformation = async () => {
    const session = await auth()
    const userId = session?.user?.id ? session.user.id : Number.MAX_SAFE_INTEGER.toString()
    /*TODO : fix stakeholderid
    const {
        stakeHolders: [{ stakeHolderId } = { stakeHolderId: "" }],
    } = await getContactPersonById(userId)*/
    const projects = await getProjectsByStakeHolderId("stakeHolderId")
    return { projects }
}

const DashboardPlantsPage = async () => {
    const { projects } = await getInformation()

    return (
        <section className="min-h-main py-4 space-y-4">
            <SessionProvider>
                <AddNewProject />
            </SessionProvider>
            <Suspense fallback={<p>Table...</p>}>
                <TableProjects projects={projects} />
            </Suspense>
        </section>
    )
}

export default DashboardPlantsPage
