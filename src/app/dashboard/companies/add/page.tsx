import { AddCompany } from "@/ui/dashboard/companies/add-company"
import { SessionProvider } from "next-auth/react"

const AddCompanyPage = async () => {
    return (
        <SessionProvider>
            <AddCompany />
        </SessionProvider>
    )
}

export default AddCompanyPage
