import { auth } from "@/lib/auth"
<<<<<<<< HEAD:src/app/dashboard/projectOnUsers/add/page.tsx
import { AddProjectOnUser } from "@/ui/dashboard/projectOnUsers/add-projectOnUser"
import { SessionProvider } from "next-auth/react"

const AddProjectOnUserPage = async () => {
========
import { AddAddress } from "@/ui/dashboard/address/add-address"
import { SessionProvider } from "next-auth/react"

const AddAdrressPage = async () => {
>>>>>>>> 38f79f1 (chore: migrate logic to new database (#65)):src/app/dashboard/address/add/page.tsx
    const session = await auth()

    return (
        <SessionProvider session={session}>
<<<<<<<< HEAD:src/app/dashboard/projectOnUsers/add/page.tsx
            <AddProjectOnUser />
========
            <AddAddress />
>>>>>>>> 38f79f1 (chore: migrate logic to new database (#65)):src/app/dashboard/address/add/page.tsx
        </SessionProvider>
    )
}

<<<<<<<< HEAD:src/app/dashboard/projectOnUsers/add/page.tsx
export default AddProjectOnUserPage
========
export default AddAdrressPage
>>>>>>>> 38f79f1 (chore: migrate logic to new database (#65)):src/app/dashboard/address/add/page.tsx
