import { Metadata } from "next"
import { Suspense } from "react"
import { auth } from "@/lib/auth"
import { getContactPersonById, getContactPersonByStakeHolderId } from "@/lib/services"
import { TableContactPeople } from "@/ui/dashboard/contect-people/table"

export const metadata: Metadata = {
    title: "List of users",
    description: "Manage users in the dashboard.",
}

const getInformation = async () => {
    const session = await auth()
    const userId = session?.user?.id ? session.user.id : Number.MAX_SAFE_INTEGER.toString()

    const {
        stakeHolder: [{ idStakeHolder } = { idStakeHolder: "" }],
    } = await getContactPersonById(userId)
    const contactPeople = await getContactPersonByStakeHolderId(idStakeHolder)
    return { contactPeople }
}

const DashboardContactPeoplePage = async () => {
    const { contactPeople } = await getInformation()

    return (
        <section className="min-h-main py-4 space-y-4">
            <Suspense fallback={<p>Table...</p>}>
                <TableContactPeople contactPeople={contactPeople} />
            </Suspense>
        </section>
    )
}

export default DashboardContactPeoplePage
