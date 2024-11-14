import { Metadata } from "next"
import { SessionProvider } from "next-auth/react"
import { AddSample } from "@/ui/dashboard/samples/add-sample"
import { auth } from "@/lib/auth"

export const metadata: Metadata = {
    title: "Add sample",
    description: "Add a sample to the dashboard",
}

const AddSamplesPage = async () => {
    const session = await auth()
    return (
        <SessionProvider session={session}>
            <AddSample />
        </SessionProvider>
    )
}

export default AddSamplesPage
