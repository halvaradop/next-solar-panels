import { Metadata } from "next"
import { SessionProvider } from "next-auth/react"
import { AddSample } from "@/ui/dashboard/samples/add-sample"

export const metadata: Metadata = {
    title: "Add sample",
    description: "Add a sample to the dashboard",
}

const AddSamplesPage = async () => {
    return (
        <SessionProvider>
            <AddSample />
        </SessionProvider>
    )
}

export default AddSamplesPage
