import { AddZone } from "@/ui/dashboard/zones/add-zones"
import { Session } from "inspector/promises"
import { SessionProvider } from "next-auth/react"

const AddZonePage = () => {
    return (
        <SessionProvider>
            <AddZone></AddZone>
        </SessionProvider>
    )
}

export default AddZonePage
