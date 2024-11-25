import { auth } from "@/lib/auth"
import { AddUser } from "@/ui/dashboard/users/add-user"
import { SessionProvider } from "next-auth/react"

const AddUserPage = async () => {
    const session = await auth()
    return (
        <SessionProvider session={session}>
            <AddUser />
        </SessionProvider>
    )
}

export default AddUserPage
