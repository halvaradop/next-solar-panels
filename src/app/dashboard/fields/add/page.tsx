import { Metadata } from "next"
import { AddField } from "@/ui/dashboard/fields/add-fields"

export const metadata: Metadata = {
    title: "Add Zone",
    description: "Add a new zone",
}

const AddFieldPage = async () => {
    return <AddField />
}

export default AddFieldPage
