import { Suspense } from "react"
import { auth } from "@/lib/auth"
import { getUserById, getUsersByCompanyId } from "@/lib/services"
import { TableUsers } from "@/ui/dashboard/users/table"

const getInformation = async () => {
    const session = await auth()
    const userId = session?.user?.id ? Number(session.user.id) : Number.MAX_SAFE_INTEGER
    const { companyId } = await getUserById(userId)
    const users = await getUsersByCompanyId(companyId)
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
