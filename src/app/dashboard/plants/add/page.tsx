import { Metadata } from "next"
import { auth } from "@/lib/auth"
import { SessionProvider } from "next-auth/react"
import { AddPlant } from "@/ui/dashboard/projects/add-plant"

export const metadata: Metadata = {
    title: "Add Plant",
    description: "Add a new plant",
}

const AddPlantPage = async () => {
    const session = await auth()
    return (
        <SessionProvider session={session}>
            <AddPlant />
        </SessionProvider>
    )
}

export default AddPlantPage
