import { Metadata } from "next"
import { AddStakeHolder } from "@/ui/dashboard/stake-holders/add-stake-holders"

export const metadata: Metadata = {
    title: "Add Stake Holder",
    description: "Add new Stake Holder",
}

const AddStakeHolderPage = async () => {
    return <AddStakeHolder />
}

export default AddStakeHolderPage
