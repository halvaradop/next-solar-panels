import { Metadata } from "next"
import { auth } from "@/lib/auth"
import { AddAddress } from "@/ui/dashboard/address/add-address"
import { SessionProvider } from "next-auth/react"

export const metadata: Metadata = {
    title: "Add User to Plant",
    description: "Add a new user to an existing plant in the dashboard.",
}

const AddAdrressPage = async () => {
    const session = await auth()

    return (
        <SessionProvider session={session}>
            <AddAddress />
        </SessionProvider>
    )
}

export default AddAdrressPage
