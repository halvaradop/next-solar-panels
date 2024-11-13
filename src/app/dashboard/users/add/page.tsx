import { AddUser } from "@/ui/dashboard/users/add-user"
import { SessionProvider } from "next-auth/react"



const AddUserPage = async () => {
    return (
        <SessionProvider>
            <AddUser />
        </SessionProvider>
    )
}

export default AddUserPage
