import { Metadata } from "next"
import { AddPositionData } from "@/ui/dashboard/postion-datas/add-position-data"

export const metadata: Metadata = {
    title: "Add Position Data",
    description: "Add a new Position Data",
}
const AddPositionDataPage = async () => {
    return <AddPositionData />
}

export default AddPositionDataPage
