import { Suspense } from "react"
import { getCompanies } from "@/lib/services"
import { Table } from "@/ui/dashboard/companies/table"

const DashboardCompaniesPage = async () => {
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
