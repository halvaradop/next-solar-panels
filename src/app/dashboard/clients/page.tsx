import { Metadata } from "next"
import { Suspense } from "react"
import { getClients } from "@/lib/services"
import { TableClients } from "@/ui/dashboard/clients/table"
import { TableClientsProps } from "@/lib/@types/props"
import { auth } from "@/lib/auth"

export const metadata: Metadata = {
    title: "Clients",
    description: "List of clients",
}

const DashboardClientsPage = async () => {
    const session = await auth()
    const clients = await getClients<TableClientsProps["clients"]>()

    return (
        <section className="min-h-main py-4 space-y-4">
            <Suspense fallback={<p>Table...</p>}>
                <TableClients clients={clients} />
            </Suspense>
        </section>
    )
}

export default DashboardClientsPage
