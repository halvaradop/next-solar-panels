import { Metadata } from "next"
import { auth } from "@/lib/auth"
import { AddContactPerson } from "@/ui/dashboard/contact-people/add-contact-person"
import { SessionProvider } from "next-auth/react"

export const metadata: Metadata = {
    title: "Add User",
    description: "Add a new user in the dashboard.",
}

const AddContactPersonPage = async () => {
    const session = await auth()
    return (
        <SessionProvider session={session}>
            <AddContactPerson />
        </SessionProvider>
    )
}

export default AddContactPersonPage
