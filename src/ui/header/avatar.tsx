import Image from "next/image"
import { useEffect, useState } from "react"
import { getAvatar } from "@/lib/utils"
import { Button } from "@halvaradop/ui-button"
import { signOut, useSession } from "next-auth/react"

export const Avatar = () => {
    const { data: session } = useSession()
    const [picture, setPicture] = useState<string | null>(null)
    if (!session) return null
    const {
        user: { firstName, lastName },
    } = session

    useEffect(() => {
        const fetchAvatar = async () => {
            getAvatar().then(async (response) => setPicture(response.url))
        }
        fetchAvatar()
    }, [firstName, lastName])

    return (
        <div className="w-max flex items-center justify-end gap-x-5">
            <div className="w-max hidden items-center gap-x-5 base:flex">
                {picture ? (
                    <Image width={40} height={30} src={picture} alt="random picture" priority />
                ) : (
                    <div className="size-10 rounded-full bg-slate-100"></div>
                )}
                <div className="text-end">
                    <p className="text-black font-medium">
                        {firstName} {lastName}
                    </p>
                </div>
            </div>
            <Button className="w-auto mt-4 border-white base:m-0" onClick={() => signOut({ redirectTo: "/" })}>
                Log out
            </Button>
        </div>
    )
}
