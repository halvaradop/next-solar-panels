"use client"
import Link from "next/link"
import { ProjectOnPickProps } from "@/lib/@types/props"
import { setCookieToken } from "@/lib/services/cookies"

export const Project = ({ idProject, designation }: ProjectOnPickProps) => {
    return (
        <li
            className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
            key={idProject}
            onClick={async () => await setCookieToken("c57111f6-b91a-11ef-9da8-020168ba9d14")}
        >
            <Link href="/dashboard/projects" className="block h-full text-center">
                <div className="text-xl font-semibold text-slate-700">{designation}</div>
            </Link>
        </li>
    )
}
