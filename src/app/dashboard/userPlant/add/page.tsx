import { auth } from "@/lib/auth"
import { AddUserPlant } from "@/ui/dashboard/usersPlants/add-userPlants"
import { SessionProvider } from "next-auth/react"

const AddUserPlantPage = async () => {
    const session = await auth()
    return (
        <SessionProvider session={session}>
            <AddUserPlant />
        </SessionProvider>
    )
}

export default AddUserPlantPage
