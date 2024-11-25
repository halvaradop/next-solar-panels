import { Metadata } from "next"
import { auth } from "@/lib/auth"
import { AddUser } from "@/ui/dashboard/users/add-user"
import { SessionProvider } from "next-auth/react"

export const metadata: Metadata = {
    title: "Add User",
    description: "Add a new user in the dashboard.",
}

const AddUserPage = async () => {
    const session = await auth()
    return (
        <SessionProvider session={session}>
            <AddUser />
        </SessionProvider>
    )
}

export default AddUserPage
