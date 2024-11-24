import { Suspense } from "react"
import { auth } from "@/lib/auth"
import { getUserById, getUsersByClientId } from "@/lib/services"
import { TableUsers } from "@/ui/dashboard/users/table"

const getInformation = async () => {
    const session = await auth()
    const userId = session?.user?.id ? session.user.id : Number.MAX_SAFE_INTEGER.toString()
    const { projectsOnUsers } = await getUserById(userId)
    const clientId = projectsOnUsers[0]?.project.clients.clientId
    const users = await getUsersByClientId(clientId)
    return { users }
}

const DashboardCompaniesPage = async () => {
    const { users } = await getInformation()

    return (
        <section className="min-h-main py-4 space-y-4">
            <Suspense fallback={<p>Table...</p>}>
                <TableUsers users={users} />
            </Suspense>
        </section>
    )
}

export default DashboardCompaniesPage
