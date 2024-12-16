"use client"
import Link from "next/link"
import { ProjectOnPickProps } from "@/lib/@types/props"
import { setCookieToken } from "@/lib/services/cookies"

export const Project = ({ idProject, contactPersonId, designation }: ProjectOnPickProps) => {
    return (
        <li
            className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
            key={idProject}
            onClick={async () => await setCookieToken(idProject, contactPersonId)}
        >
            <Link href="/dashboard/projects" className="block h-full text-center">
                <div className="text-xl font-semibold text-slate-700">{designation}</div>
            </Link>
        </li>
    )
}
