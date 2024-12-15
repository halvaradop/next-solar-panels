"use client"
import Link from "next/link"
import { ProjectOnPickProps } from "@/lib/@types/props"
import { setCookieToken } from "@/lib/services/cookies"
import { useSession } from "next-auth/react"

/**
 * TODO: Improve
 */
export const Project = ({ idProject, designation }: ProjectOnPickProps) => {
    const { data: session } = useSession()
    if (!session) return null

    return (
        <li
            className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
            key={idProject}
            onClick={async () => await setCookieToken(idProject, session.user.id!)}
        >
            <Link href="/dashboard/projects" className="block h-full text-center">
                <div className="text-xl font-semibold text-slate-700">{designation}</div>
            </Link>
        </li>
    )
}
