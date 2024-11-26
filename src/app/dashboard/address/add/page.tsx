import { Metadata } from "next"
import { auth } from "@/lib/auth"
import { AddAddress } from "@/ui/dashboard/address/add-address"
import { SessionProvider } from "next-auth/react"

export const metadata: Metadata = {
    title: "Add Address",
    description: "Add a new address",
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
