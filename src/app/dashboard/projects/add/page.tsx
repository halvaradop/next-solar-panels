import { Metadata } from "next"
import { AddProject } from "@/ui/dashboard/projects/add-project"

export const metadata: Metadata = {
    title: "Add Plant",
    description: "Add a new plant",
}

const AddProjectPage = async () => {
    return <AddProject />
}

export default AddProjectPage
