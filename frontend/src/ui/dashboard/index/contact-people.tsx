import { CardDashboard } from "./card"
import { getContactPeople, getContactPeopleByStakeHolderId } from "@/lib/services"

export const ContactPerson = async ({ stakeholderId }: { stakeholderId?: string }) => {
    const contacts = stakeholderId ? await getContactPeopleByStakeHolderId(stakeholderId) : await getContactPeople()
    return <CardDashboard href="/dashboard/contact-people" title="Contacts" count={contacts.length} />
}
