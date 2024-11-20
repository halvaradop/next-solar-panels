import { auth } from "@/lib/auth"
import { AddCompany } from "@/ui/dashboard/companies/add-company"
import { SessionProvider } from "next-auth/react"

const AddCompanyPage = async () => {
    const session = await auth()

    return (
        <SessionProvider session={session}>
            <AddCompany />
        </SessionProvider>
    )
}

export default AddCompanyPage
