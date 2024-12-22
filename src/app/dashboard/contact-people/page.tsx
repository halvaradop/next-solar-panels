import { Metadata } from "next"
import { Suspense } from "react"
import { getContactPeopleByStakeHolderId } from "@/lib/services"
import { TableContactPeople } from "@/ui/dashboard/contact-people/table"
import { AddNewContactPerson } from "@/ui/dashboard/contact-people/add-new-contact-person"
import { getSessionToken } from "@/lib/utils"

export const metadata: Metadata = {
    title: "List of users",
    description: "Manage users in the dashboard.",
}

const getInformation = async () => {
    const { idStakeHolder } = await getSessionToken()
    const contactPeople = await getContactPeopleByStakeHolderId(idStakeHolder)
    return { contactPeople }
}

const DashboardContactPeoplePage = async () => {
    const { contactPeople } = await getInformation()

    return (
        <section className="min-h-main py-4 space-y-4">
            <AddNewContactPerson />
            <Suspense fallback={<p>Table...</p>}>
                <TableContactPeople contactPeople={contactPeople} />
            </Suspense>
        </section>
    )
}

export default DashboardContactPeoplePage
