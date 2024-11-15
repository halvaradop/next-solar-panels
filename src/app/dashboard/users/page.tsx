import { Suspense } from "react"
import { auth } from "@/lib/auth"
import { getUserByCompany } from "@/lib/services"
import { Table } from "@/ui/dashboard/users/table"

const DashboardCompaniesPage = async () => {
    const session = await auth()
    const userId = session?.user?.id ? Number(session.user.id) : Number.MAX_SAFE_INTEGER
    const users = await getUserByCompany(userId)

    return (
        <section className="min-h-main py-4 space-y-4">
            <Suspense fallback={<p>Table...</p>}>
                <Table users={users} />
            </Suspense>
        </section>
    )
}

export default DashboardCompaniesPage
