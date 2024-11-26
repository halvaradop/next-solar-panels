import { Metadata } from "next"
import { auth } from "@/lib/auth"
import { SessionProvider } from "next-auth/react"
import { AddProject } from "@/ui/dashboard/projects/add-project"

export const metadata: Metadata = {
    title: "Add Project",
    description: "Add a new project",
}

const AddProjectPage = async () => {
    const session = await auth()
    return (
        <SessionProvider session={session}>
            <AddProject />
        </SessionProvider>
    )
}

export default AddProjectPage
