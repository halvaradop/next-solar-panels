import { Suspense } from "react"
import { auth } from "@/lib/auth"
import { getContactPersonById, getContacPersonProjectsByStakeHolder } from "@/lib/services"
import { TableProjectsOnUsers } from "@/ui/dashboard/projets-on-users/table"

/*

Todo fix
*/
const getInformation = async () => {
    const session = await auth()
    const userId = session?.user?.id ? session.user.id : Number.MAX_SAFE_INTEGER.toString()
    /*  const {
        stakeholders: [{ stakeholderId } = {stakeholderId: "" }],
    } = await TableProjectsOnUsers(userId)
    const projectsOnUser = await getContacPersonProjectsByStakeHolder(stakeholderId)
    return { projectsOnUser }
    */
}

const DashboardProjectOnUserPage = async () => {
    //  const { projectsOnUser } = await getInformation()

    return (
        <section className="min-h-main py-4 space-y-4">
            <Suspense fallback={<p>Table...</p>}>{/*<TableProjectsOnUsers projectsOnUsers={projectsOnUser} >*/}</Suspense>
        </section>
    )
}

export default DashboardProjectOnUserPage
