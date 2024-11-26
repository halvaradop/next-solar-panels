import { auth } from "@/lib/auth"
import { AddProjectOnUser } from "@/ui/dashboard/projectOnUsers/add-projectOnUser"
import { SessionProvider } from "next-auth/react"

const AddProjectOnUserPage = async () => {
    const session = await auth()
    return (
        <SessionProvider session={session}>
            <AddProjectOnUser />
        </SessionProvider>
    )
}

export default AddProjectOnUserPage
