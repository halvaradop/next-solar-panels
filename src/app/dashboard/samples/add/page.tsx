import { Metadata } from "next"
import { AddSample } from "@/ui/dashboard/samples/add-sample"

export const metadata: Metadata = {
    title: "Add sample",
    description: "Add a sample to the dashboard",
}
const AddSamplesPage = () => {
    return <AddSample />
}

export default AddSamplesPage
