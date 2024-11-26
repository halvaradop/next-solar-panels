import { Metadata } from "next"
import { Suspense } from "react"
import { auth } from "@/lib/auth"
import { getUserById, getUsersByClientId } from "@/lib/services"
import { TableUsers } from "@/ui/dashboard/users/table"

export const metadata: Metadata = {
    title: "List of users",
    description: "Manage users in the dashboard.",
}

const getInformation = async () => {
    const session = await auth()
    const userId = session?.user?.id ? session.user.id : Number.MAX_SAFE_INTEGER.toString()
    const {
        clients: [{ clientId } = { clientId: "" }],
    } = await getUserById(userId)
    const users = await getUsersByClientId(clientId)
    return { users }
}

const DashboardUsersPage = async () => {
    const { users } = await getInformation()

    return (
        <section className="min-h-main py-4 space-y-4">
            <Suspense fallback={<p>Table...</p>}>
                <TableUsers users={users} />
            </Suspense>
        </section>
    )
}

export default DashboardUsersPage
