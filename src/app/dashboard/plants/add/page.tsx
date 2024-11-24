import { auth } from "@/lib/auth"
import { AddPlant } from "@/ui/dashboard/projects/add-plant"
import { SessionProvider } from "next-auth/react"

const AddPlantPage = async () => {
    const session = await auth()
    return (
        <SessionProvider session={session}>
            <AddPlant />
        </SessionProvider>
    )
}

export default AddPlantPage
