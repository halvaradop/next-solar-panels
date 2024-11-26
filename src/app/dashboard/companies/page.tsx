import { Metadata } from "next"
import { Suspense } from "react"
import { getClients } from "@/lib/services"
import { TableCompanies } from "@/ui/dashboard/companies/table"
import { TableCompaniesProps } from "@/lib/@types/props"
import { auth } from "@/lib/auth"

export const metadata: Metadata = {
    title: "Companies",
    description: "List of companies",
}

const DashboardCompaniesPage = async () => {
    /**
     * TODO: fix bug created if auth() function is not called
     */
    const session = await auth()
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
