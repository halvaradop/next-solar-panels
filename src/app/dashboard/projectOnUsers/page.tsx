import { Suspense } from "react"
import { auth } from "@/lib/auth"
import { getUserById, getUserProjectsByClients } from "@/lib/services"
import { TableProjectOnuser } from "@/ui/dashboard/projectOnUsers/table"

const getInformation = async () => {
    const session = await auth()
    const userId = session?.user?.id ? session.user.id : Number.MAX_SAFE_INTEGER.toString()
    const {
        clients: [{ clientId } = { clientId: "" }],
    } = await getUserById(userId)
    const projectsOnUser = await getUserProjectsByClients(clientId)
    return { projectsOnUser }
}

const DashboardProjectOnUserPage = async () => {
    const { projectsOnUser } = await getInformation()

    return (
        <section className="min-h-main py-4 space-y-4">
            <Suspense fallback={<p>Table...</p>}>
                <TableProjectOnuser projectsOnUsers={projectsOnUser} />
            </Suspense>
        </section>
    )
}

export default DashboardProjectOnUserPage
