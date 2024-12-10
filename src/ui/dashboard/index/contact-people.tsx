import contactPersonIcon from "@/public/contact-person.png"
import { CardDashboard } from "./card"
import { getContactaPeople, getContactPersonByStakeHolderId } from "@/lib/services"

export const ContactPerson = async ({ stakeholderId }: { stakeholderId?: string }) => {
    const contacts = stakeholderId ? await getContactPersonByStakeHolderId(stakeholderId) : await getContactaPeople()
    return <CardDashboard src={contactPersonIcon} alt="contact person" title="Contacts" count={contacts.length} />
}
