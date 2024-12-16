import { auth } from "@/lib/auth"
import { SessionProvider } from "next-auth/react"
import { Header } from "./header"

export const HeaderWrapper = async () => {
    const session = await auth()
    return (
        <SessionProvider session={session}>
            <Header />
        </SessionProvider>
    )
}
