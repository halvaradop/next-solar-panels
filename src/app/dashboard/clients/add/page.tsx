import { Metadata } from "next"
import { auth } from "@/lib/auth"
import { AddClient } from "@/ui/dashboard/clients/add-client"
import { SessionProvider } from "next-auth/react"

export const metadata: Metadata = {
    title: "Add Client",
    description: "Add new client",
}

const AddClientPage = async () => {
    const session = await auth()

    return (
        <SessionProvider session={session}>
            <AddClient />
        </SessionProvider>
    )
}

export default AddClientPage
