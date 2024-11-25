import { Metadata } from "next"
import { AddPlant } from "@/ui/dashboard/plants/add-plant"
import { SessionProvider } from "next-auth/react"

export const metadata: Metadata = {
    title: "Add Plant",
    description: "Add a new plant",
}

const AddPlantPage = async () => {
    return (
        <SessionProvider>
            <AddPlant />
        </SessionProvider>
    )
}

export default AddPlantPage
