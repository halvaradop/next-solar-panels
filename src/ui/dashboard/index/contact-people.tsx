import { CardDashboard } from "./card"
import { getContactaPeople, getContactPersonByStakeHolderId } from "@/lib/services"

export const ContactPerson = async ({ stakeholderId }: { stakeholderId?: string }) => {
    const contacts = stakeholderId ? await getContactPersonByStakeHolderId(stakeholderId) : await getContactaPeople()
    return <CardDashboard href="/dashboard/contact-people" title="Contacts" count={contacts.length} />
}
