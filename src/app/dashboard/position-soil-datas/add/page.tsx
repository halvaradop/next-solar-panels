import { Metadata } from "next"
import { AddPositionSoilDatas } from "@/ui/dashboard/position-soil-datas/add-position-soil-datas"

export const metadata: Metadata = {
    title: "Add sample",
    description: "Add a sample to the dashboard",
}

const AddPositionSoilDatasPage = async () => {
    return <AddPositionSoilDatas />
}

export default AddPositionSoilDatasPage
