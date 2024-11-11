import { auth } from "@/lib/auth"
import { AddZone } from "@/ui/dashboard/zones/add-zones"
import { SessionProvider } from "next-auth/react"

const AddZonePage = async () => {
    const session = await auth()
    return (
        <SessionProvider session={session}>
            <AddZone />
        </SessionProvider>
    )
}

export default AddZonePage
