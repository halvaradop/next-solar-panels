import { Suspense } from "react"
import { auth } from "@/lib/auth"
import { getCompanies } from "@/lib/services"
import { Table } from "@/ui/dashboard/companies/table"

/**
 * TODO: fix bug if the session is removed
 */
const DashboardCompaniesPage = async () => {
    const session = await auth()
    const companies = await getCompanies()

    return (
        <section className="min-h-main py-4 space-y-4">
            <Suspense fallback={<p>Table...</p>}>
                <Table companies={companies} />
            </Suspense>
        </section>
    )
}

export default DashboardCompaniesPage
