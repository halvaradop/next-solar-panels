
import { AddPlant } from "@/ui/dashboard/plants/add-plant"
import { SessionProvider } from "next-auth/react"

const AddPlantPage = async () => {
    return (
        <SessionProvider>
            <AddPlant />
        </SessionProvider>
    )
}

export default AddPlantPage
