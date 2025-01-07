"use client"
import Image from "next/image"
import { useState } from "react"
import { Button } from "@halvaradop/ui-button"
import { signOut, useSession } from "next-auth/react"

export const Avatar = () => {
    const { data: session } = useSession()
    const [picture] = useState<string | null>(null)
    if (!session) return null
    const {
        user: { firstName, lastName },
    } = session

    return (
        <div className="w-full flex items-center justify-end gap-x-5 base:w-auto">
            <div className="w-max hidden items-center gap-x-5 base:flex">
                {picture ? (
                    <Image
                        className="size-auto object-contain"
                        width={40}
                        height={30}
                        src={picture}
                        alt="random picture"
                        priority
                    />
                ) : (
                    <div className="size-10 rounded-full bg-slate-100"></div>
                )}
                <div className="text-end">
                    <p className="text-black font-medium">
                        {firstName} {lastName}
                    </p>
                </div>
            </div>
            <Button
                className="w-full mt-4 border-sky-500 bg-sky-500 focus-visible:ring-sky-500 base:w-auto base:m-0"
                onClick={() => signOut({ redirectTo: "/" })}
            >
                Log out
            </Button>
        </div>
    )
}
