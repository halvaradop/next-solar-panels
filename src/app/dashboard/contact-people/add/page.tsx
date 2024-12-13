import { Metadata } from "next"
import { AddContactPerson } from "@/ui/dashboard/contact-people/add-contact-person"

export const metadata: Metadata = {
    title: "Add User",
    description: "Add a new user in the dashboard.",
}

const AddContactPersonPage = async () => {
    return <AddContactPerson />
}

export default AddContactPersonPage
