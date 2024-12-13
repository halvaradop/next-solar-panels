import { Metadata } from "next"
import { AddAddress } from "@/ui/dashboard/address/add-address"

export const metadata: Metadata = {
    title: "Add Address",
    description: "Add a new address",
}

const AddAddressPage = async () => {
    return <AddAddress />
}

export default AddAddressPage
