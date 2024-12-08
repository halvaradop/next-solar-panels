import { Metadata } from "next"
import { auth } from "@/lib/auth"
import { AddField } from "@/ui/dashboard/fields/add-fields"
import { SessionProvider } from "next-auth/react"

export const metadata: Metadata = {
    title: "Add Zone",
    description: "Add a new zone",
}

const AddFieldPage = async () => {
    const session = await auth()
    return (
        <SessionProvider session={session}>
            <AddField />
        </SessionProvider>
    )
}

export default AddFieldPage
