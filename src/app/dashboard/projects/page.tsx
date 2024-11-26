import { Metadata } from "next"
import { Suspense } from "react"
import { auth } from "@/lib/auth"
import { getProjectsByClientId, getUserById } from "@/lib/services"
import { TableProjects } from "@/ui/dashboard/projects/table"

export const metadata: Metadata = {
    title: "Project",
    description: "List of projects",
}

const getInformation = async () => {
    const session = await auth()
    const userId = session?.user?.id ? session.user.id : Number.MAX_SAFE_INTEGER.toString()
    const {
        clients: [{ clientId } = { clientId: "" }],
    } = await getUserById(userId)
    const project = await getProjectsByClientId(clientId)
    return { project }
}

const DashboardProjectsPage = async () => {
    const { project } = await getInformation()

    return (
        <section className="min-h-main py-4 space-y-4">
            <Suspense fallback={<p>Table...</p>}>
                <TableProjects project={project} />
            </Suspense>
        </section>
    )
}

export default DashboardProjectsPage
