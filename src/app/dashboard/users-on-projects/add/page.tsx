import { auth } from "@/lib/auth"
import { AddProjectOnUser } from "@/ui/dashboard/projets-on-users/add-projects-on-users"
import { SessionProvider } from "next-auth/react"

const AddProjectsOnUsersPage = async () => {
    const session = await auth()
    return (
        <SessionProvider session={session}>
            <AddProjectOnUser />
        </SessionProvider>
    )
}

export default AddProjectsOnUsersPage
