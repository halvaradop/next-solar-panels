import { Metadata } from "next"
import { auth } from "@/lib/auth"
import { AddUserPlant } from "@/ui/dashboard/usersPlants/add-userPlants"
import { SessionProvider } from "next-auth/react"

export const metadata: Metadata = {
    title: "Add User to Plant",
    description: "Add a new user to an existing plant in the dashboard.",
}

const AddUserPlantPage = async () => {
    const session = await auth()
    return (
        <SessionProvider session={session}>
            <AddUserPlant />
        </SessionProvider>
    )
}

export default AddUserPlantPage
