import { Metadata } from "next"
import { SessionProvider } from "next-auth/react"
import { AddPositionSoilDatas } from "@/ui/dashboard/position-soil-datas/add-position-soil-datas"
import { auth } from "@/lib/auth"

export const metadata: Metadata = {
    title: "Add sample",
    description: "Add a sample to the dashboard",
}

const AddPositionSoilDatasPage = async () => {
    const session = await auth()
    return (
        <SessionProvider session={session}>
            <AddPositionSoilDatas />
        </SessionProvider>
    )
}

export default AddPositionSoilDatasPage
