import { Metadata } from "next"
import { auth } from "@/lib/auth"
import { AddStakeHolder } from "@/ui/dashboard/stake-holders/add-stake-holders"
import { SessionProvider } from "next-auth/react"

export const metadata: Metadata = {
    title: "Add Stake Holder",
    description: "Add new Stake Holder",
}

const AddStakeHolderPage = async () => {
    const session = await auth()

    return (
        <SessionProvider session={session}>
            <AddStakeHolder />
        </SessionProvider>
    )
}

export default AddStakeHolderPage
