"use client"
import Link from "next/link"
import { ProjectOnPickProps } from "@/lib/@types/props"
import { setProjectToken } from "@/lib/services"

export const Project = ({ contactPersonId, idProject, designation }: ProjectOnPickProps) => {
    return (
        <li
            className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
            key={idProject}
            onClick={async () => await setProjectToken(contactPersonId, idProject)}
        >
            <Link href="/dashboard/projects" className="block h-full text-center">
                <div className="text-xl font-semibold text-slate-700">{designation}</div>
            </Link>
        </li>
    )
}
