import { Metadata } from "next"
import { auth } from "@/lib/auth"
import { SessionProvider } from "next-auth/react"
import { AddPositionData } from "@/ui/dashboard/postion-datas/add-position-data"

export const metadata: Metadata = {
    title: "Add Position Data",
    description: "Add a new Position Data",
}

const AddPositionDataPage = async () => {
    const session = await auth()
    return (
        <SessionProvider session={session}>
            <AddPositionData />
        </SessionProvider>
    )
}

export default AddPositionDataPage
