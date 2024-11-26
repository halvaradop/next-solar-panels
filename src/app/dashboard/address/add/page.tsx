import { auth } from "@/lib/auth"
import { AddAddress } from "@/ui/dashboard/address/add-address"
import { SessionProvider } from "next-auth/react"

const AddAdrressPage = async () => {
    const session = await auth()

    return (
        <SessionProvider session={session}>
            <AddAddress />
        </SessionProvider>
    )
}

export default AddAdrressPage
