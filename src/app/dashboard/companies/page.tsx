import { Suspense } from "react"
import { getClients } from "@/lib/services"
import { TableCompanies } from "@/ui/dashboard/companies/table"
import { TableCompaniesProps } from "@/lib/@types/props"

const DashboardCompaniesPage = async () => {
    const companies = await getClients<TableCompaniesProps["companies"]>()

    return (
        <section className="min-h-main py-4 space-y-4">
            <Suspense fallback={<p>Table...</p>}>
                <TableCompanies companies={companies} />
            </Suspense>
        </section>
    )
}

export default DashboardCompaniesPage
